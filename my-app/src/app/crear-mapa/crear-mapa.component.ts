import { NgFor, NgStyle } from '@angular/common';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMapa } from '../../models/Mapa';
import { TokenStorageService } from '../token-storage.service';
import { MapaService } from '../mapa/mapa.service';
import { FormsModule } from '@angular/forms';

interface Image {
  name: string;
  src: string;
}

@Component({
  selector: 'app-crear-mapa',
  standalone: true,
  imports: [NgFor, FormsModule, NgStyle],
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
    { name: 'Image 1', src: '../../facuhdr1.jpeg' },
    { name: 'Image 2', src: '../../facuhdr2.jpg' },
    { name: 'Image 3', src: '../../facuhdr3.jpg' },
    { name: 'Image 1', src: '../../facuhdr1.jpeg' },
    { name: 'Image 2', src: '../../facuhdr2.jpg' },
    { name: 'Image 3', src: '../../facuhdr3.jpg' },
    { name: 'Image 1', src: '../../facuhdr1.jpeg' },
    { name: 'Image 2', src: '../../facuhdr2.jpg' },
    { name: 'Image 3', src: '../../facuhdr3.jpg' },
    { name: 'Image 1', src: '../../facuhdr1.jpeg' },
    { name: 'Image 2', src: '../../facuhdr2.jpg' },
    { name: 'Image 3', src: '../../facuhdr3.jpg' },
    { name: 'Image 1', src: '../../facuhdr1.jpeg' },
    { name: 'Image 2', src: '../../facuhdr2.jpg' },
    { name: 'Image 3', src: '../../facuhdr3.jpg' },
    { name: 'Image 1', src: '../../facuhdr1.jpeg' },
    { name: 'Image 2', src: '../../facuhdr2.jpg' },
    { name: 'Image 3', src: '../../facuhdr3.jpg' },
    { name: 'Image 3', src: '../../facuhdr3.jpg' },
    { name: 'Image 1', src: '../../facuhdr1.jpeg' },
    { name: 'Image 2', src: '../../facuhdr2.jpg' },
    { name: 'Image 3', src: '../../facuhdr3.jpg' },
    { name: 'Image 1', src: '../../facuhdr1.jpeg' },
    { name: 'Image 2', src: '../../facuhdr2.jpg' },
    { name: 'Image 3', src: '../../facuhdr3.jpg' },
    { name: 'Image 2', src: '../../facuhdr2.jpg' },
    { name: 'Image 3', src: '../../facuhdr3.jpg' },
  ];
  grid: (Image | null)[][] = [];
  mapName: string = '';
  isVisible = false; // Controla la visibilidad del popup

  constructor(
    private tokenStorageService: TokenStorageService,
    private mapaService: MapaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
    const context = canvas.getContext('2d');

    if (context) {
      const rows = Math.floor(canvas.height / this.squareHeight);
      const cols = Math.floor(canvas.width / this.squareWidth);

      // Inicializar la matriz grid con null (sin imágenes)
      for (let i = 0; i < rows; i++) {
        this.grid[i] = [];
        for (let j = 0; j < cols; j++) {
          this.grid[i][j] = null;
          context.strokeRect(
            j * this.squareWidth,
            i * this.squareHeight,
            this.squareWidth,
            this.squareHeight
          );
        }
      }

      canvas.addEventListener('click', this.handleCanvasClick.bind(this));
    } else {
      console.error('El contexto 2D no está disponible.');
    }
  }

  handleCanvasClick(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    if (context && this.selectedImage) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const col = Math.floor(x / this.squareWidth);
      const row = Math.floor(y / this.squareHeight);

      const image = new Image();
      image.src = this.selectedImage.src;
      image.onload = () => {
        context.drawImage(
          image,
          col * this.squareWidth,
          row * this.squareHeight,
          this.squareWidth,
          this.squareHeight
        );
        context.strokeRect(
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

  selectImage(image: Image): void {
    this.selectedImage = image;
  }

  exportToJson(): void {
    const json = JSON.stringify(this.grid, null, 2);
    const mapaPost: IMapa = {
      id: -1,
      name: this.mapName || 'Map',
      valores: json,
      photo: 'src',
      likes: 0,
      creator: this.tokenStorageService.getUser(),
      categoria: 'nuevo',
    };
    this.mapaService.postMapa(mapaPost).subscribe();
    this.togglePopup();
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
    const context = canvas.getContext('2d');

    if (context) {
      const rows = Math.floor(canvas.height / this.squareHeight);
      const cols = Math.floor(canvas.width / this.squareWidth);

      // Limpiar el canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Cargar los datos del JSON en la matriz grid
      this.grid = json;

      // Dibujar las imágenes en el canvas según los datos del JSON
      this.grid.forEach((row, rowIndex) => {
        row.forEach((image, colIndex) => {
          if (image) {
            const img = new Image();
            img.src = image.src;
            img.onload = () => {
              context.drawImage(
                img,
                colIndex * this.squareWidth,
                rowIndex * this.squareHeight,
                this.squareWidth,
                this.squareHeight
              );
              context.strokeRect(
                colIndex * this.squareWidth,
                rowIndex * this.squareHeight,
                this.squareWidth,
                this.squareHeight
              );
            };
          } else {
            context.strokeRect(
              colIndex * this.squareWidth,
              rowIndex * this.squareHeight,
              this.squareWidth,
              this.squareHeight
            );
          }
        });
      });
    } else {
      console.error('El contexto 2D no está disponible.');
    }
  }

  togglePopup() {
    this.isVisible = !this.isVisible; // Alterna la visibilidad
  }
}
