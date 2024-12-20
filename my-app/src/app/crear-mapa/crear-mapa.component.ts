import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dificultad, IMapa } from '../../models/Mapa';
import { TokenStorageService } from '../token-storage.service';
import { MapaService } from '../mapa/mapa.service';
import { FormsModule } from '@angular/forms';
import { ClipboardService } from '../clipboard.service';

interface Image {
  name: string;
  src: string;
}

@Component({
  selector: 'app-crear-mapa',
  standalone: true,
  imports: [NgFor, FormsModule, NgStyle, NgClass],
  templateUrl: './crear-mapa.component.html',
  styleUrls: ['./crear-mapa.component.css'],
})
export class CrearMapaComponent implements AfterViewInit {
  @ViewChild('myCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private squareWidth = 24;
  private squareHeight = 24;

  selectedImage: Image | null = null;
  images: Image[] = [
    { name: 'Gonza', src: '../../denudo.png' },
    { name: 'Finish', src: '/bandera.png' },
    { name: 'EnemyWalker', src: '../../fantasma.png' },
    {
      name: 'EnemyShooter',
      src: '../../gonza1.png',
    },
    { name: 'TierraPasto', src: '../../bloque.jpg' },
    { name: 'Tierra', src: '../../bloque_tierra.jpg' },
    { name: 'Arena', src: '../../arena2.png' },
    { name: 'Ladrillo', src: '../../ladrillo 1.png' },
    { name: 'MaderaClara', src: '../../madera1_fixed.png' },
    { name: 'MaderaOscura', src: '../../madera2_fixed.png' },
    { name: 'Salas', src: '../../negro_fixed.png' },
    { name: 'PiedraFea', src: '../../piedra1_fixed.png' },
    { name: 'PiedraLinda', src: '../../piedra2_fixed.png' },
    { name: 'PisoCity', src: '../../piso city.jpg' },
    { name: 'Ventana', src: '../../ventana.png' },
  ];
  imagenesEspeciales: Map<string, boolean> = new Map<string, boolean>();

  grid: (Image | null)[][] = [];
  mapName: string = '';
  isVisible = false; // Controla la visibilidad del popup
  mapaPublicado: boolean = false;
  idMapa?: number;
  dragging: boolean = false; // Estado de arrastre
  context: CanvasRenderingContext2D | null = null;
  activoIndex: number | null = null;
  isGuardar: boolean = false;
  isGomaActivo: boolean = false; // Estado de la goma
  loggedIn: boolean = true;

  constructor(
    private tokenStorageService: TokenStorageService,
    private mapaService: MapaService,
    private route: ActivatedRoute,
    private router: Router,
    private clipboardService: ClipboardService
  ) {}

  ngOnInit(): void {
    this.imagenesEspeciales.set('Gonza', false);
    this.imagenesEspeciales.set('Finish', false);
    this.loggedIn = this.tokenStorageService.isLoggedIn();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.mapaService.getOneMapa(Number(id)).subscribe((mapa: IMapa) => {
          console.log(mapa);
          this.loadJsonToCanvas(JSON.parse(mapa.valores as string));
        });
      }
    });
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.context = canvas.getContext('2d');

    if (this.context) {
      const rows = Math.floor(canvas.height / this.squareHeight);
      const cols = Math.floor(canvas.width / this.squareWidth);

      // Inicializar la matriz grid con null (sin imágenes)
      for (let i = 0; i < rows; i++) {
        this.grid[i] = [];
        for (let j = 0; j < cols; j++) {
          this.grid[i][j] = null;
          this.context.strokeRect(
            j * this.squareWidth,
            i * this.squareHeight,
            this.squareWidth,
            this.squareHeight
          );
        }
      }

      // Añadir eventos para arrastrar
      canvas.addEventListener('mousedown', this.startDrag.bind(this));
      canvas.addEventListener('mousemove', this.drag.bind(this));
      canvas.addEventListener('mouseup', this.endDrag.bind(this));
      canvas.addEventListener('mouseleave', this.endDrag.bind(this)); // Para manejar el caso cuando el cursor sale del canvas
    } else {
      console.error('El contexto 2D no está disponible.');
    }
  }

  startDrag(event: MouseEvent): void {
    if (this.isGomaActivo) {
      const canvas = this.canvasRef.nativeElement;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Calcula la columna y la fila en base a las coordenadas del mouse
      const col = Math.floor(x / this.squareWidth);
      const row = Math.floor(y / this.squareHeight);

      // Borra el cuadrado en la posición del clic
      this.borrarSquare(row, col);

      this.dragging = true;
    } else if (this.selectedImage) {
      const canvas = this.canvasRef.nativeElement;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Calcula la columna y la fila en base a las coordenadas del mouse
      const col = Math.floor(x / this.squareWidth);
      const row = Math.floor(y / this.squareHeight);

      // Dibuja el cuadrado en el canvas
      this.drawSquare(row, col);

      this.dragging = true;
    }
  }

  drag(event: MouseEvent): void {
    if (this.dragging) {
      if (this.isGomaActivo) {
        const canvas = this.canvasRef.nativeElement;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Calcula la columna y la fila en base a las coordenadas del mouse
        const col = Math.floor(x / this.squareWidth);
        const row = Math.floor(y / this.squareHeight);

        // Borra el cuadrado en el canvas
        this.borrarSquare(row, col);
      } else if (this.selectedImage && this.context) {
        const canvas = this.canvasRef.nativeElement;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Calcula la columna y la fila en base a las coordenadas del mouse
        const col = Math.floor(x / this.squareWidth);
        const row = Math.floor(y / this.squareHeight);

        // Dibuja el cuadrado en el canvas
        this.drawSquare(row, col);
      }
    }
  }

  endDrag(): void {
    this.dragging = false;
  }

  drawSquare(row: number, col: number): void {
    if (this.context && this.selectedImage) {
      if (this.grid[row][col] && this.isEspecialImagen(this.grid[row][col]!)) {
        this.imagenesEspeciales.set(this.grid[row][col]!.name, false);
      }
      const image = new Image();
      if (
        this.isEspecialImagen(this.selectedImage) &&
        this.hasPlaceEspecialImagen(this.selectedImage)
      ) {
        alert('No puedes colocar más de una imagen especial');
        return;
      } else if (this.isEspecialImagen(this.selectedImage)) {
        this.imagenesEspeciales.set(this.selectedImage.name, true);
      }
      image.src = this.selectedImage.src;
      image.onload = () => {
        this.context?.drawImage(
          image,
          col * this.squareWidth,
          row * this.squareHeight,
          this.squareWidth,
          this.squareHeight
        );
        this.context?.strokeRect(
          col * this.squareWidth,
          row * this.squareHeight,
          this.squareWidth,
          this.squareHeight
        );

        // Actualizar la matriz grid con la imagen seleccionada
        this.grid[row][col] = this.selectedImage;
      };
    }
  }

  isEspecialImagen(image: Image): boolean {
    return this.imagenesEspeciales.has(image.name);
  }

  hasPlaceEspecialImagen(image: Image): boolean {
    return this.imagenesEspeciales.get(image.name) || false;
  }

  borrarSquare(row: number, col: number): void {
    if (this.context) {
      this.context.clearRect(
        col * this.squareWidth,
        row * this.squareHeight,
        this.squareWidth,
        this.squareHeight
      );

      // Actualizar la matriz grid con null (sin imagen)
      if (this.grid[row][col] && this.isEspecialImagen(this.grid[row][col]!)) {
        this.imagenesEspeciales.set(this.grid[row][col]!.name, false);
      }
      this.grid[row][col] = null;
      this.drawBorders();
    }
  }
  drawBorders(): void {
    const canvas = this.canvasRef.nativeElement;
    if (this.context) {
      const rows = Math.floor(canvas.height / this.squareHeight);
      const cols = Math.floor(canvas.width / this.squareWidth);

      // Redibujar los bordes de todos los cuadrados
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          this.context.strokeRect(
            col * this.squareWidth,
            row * this.squareHeight,
            this.squareWidth,
            this.squareHeight
          );
        }
      }
    }
  }

  selectImage(image: Image, index: number): void {
    this.selectedImage = image;
    this.activoIndex = index;
    this.isGomaActivo = false; // Desactivar goma al seleccionar una imagen
  }

  activarGoma(): void {
    this.isGomaActivo = true; // Activar goma
    this.selectedImage = null; // Desactivar selección de imagen
    this.activoIndex = null; // Desactivar el borde css
  }

  limitarFilas(matriz: any[][], maxElementos: number = 32): any[][] {
    return matriz.map((fila) => fila.slice(0, maxElementos));
  }

  exportToJson(): void {
    if (!this.allEspecialImagesPlaced()) {
      alert('Debes colocar todas las imágenes especiales');
      return;
    }
    this.grid = this.limitarFilas(this.grid);
    const json = JSON.stringify(this.grid, null, 2);

    const canvas = this.canvasRef.nativeElement;
    const dataURL: string = canvas.toDataURL('image/png');
    const mapaPost: IMapa = {
      id: -1,
      name: this.mapName || 'Map',
      valores: json,
      photo: dataURL,
      likes: 0,
      creator: this.tokenStorageService.getUser(),
      categoria: 'nuevo',
      dificultad: Dificultad.noTesteado,
      intentos: []
    };
    this.mapaService.postMapa(mapaPost).subscribe((id: number) => {
      this.idMapa = id;
      this.copyText(String(id));
      this.mapaPublicado = true;
    });
  }

  allEspecialImagesPlaced(): boolean {
    return Array.from(this.imagenesEspeciales.values()).every((value) => value);
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        this.loadJsonToCanvas(json);
      } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
      }
    };

    reader.readAsText(file);
  }

  loadJsonToCanvas(json: any): void {
    const canvas = this.canvasRef.nativeElement;
    if (this.context) {
      const rows = Math.floor(canvas.height / this.squareHeight);
      const cols = Math.floor(canvas.width / this.squareWidth);

      // Limpiar el canvas
      this.context.clearRect(0, 0, canvas.width, canvas.height);

      // Cargar los datos del JSON en la matriz grid
      this.grid = json;

      // Dibujar las imágenes en el canvas según los datos del JSON
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const image = this.grid[row][col];
          if (image) {
            const img = new Image();
            img.src = image.src;
            img.onload = () => {
              this.context?.drawImage(
                img,
                col * this.squareWidth,
                row * this.squareHeight,
                this.squareWidth,
                this.squareHeight
              );
              this.context?.strokeRect(
                col * this.squareWidth,
                row * this.squareHeight,
                this.squareWidth,
                this.squareHeight
              );
            };
          }
        }
      }
    }
  }

  cambiarVisibilidad(): void {
    this.isVisible = !this.isVisible;
  }

  togglePopup() {
    this.isVisible = !this.isVisible; // Alterna la visibilidad
  }

  recargar() {
    window.location.reload();
  }
  togglePopupGuardado() {
    this.isGuardar = !this.isGuardar; // Alterna la visibilidad
  }
  routerIniciarSesion() {
    this.router.navigate(['inicio-sesion']);
  }

  routerRegistrarse() {
    this.router.navigate(['registro']);
  }

  copyText(text: string): void {
    this.clipboardService.copy(text);
  }
}
