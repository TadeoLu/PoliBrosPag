import { NgFor } from '@angular/common';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dificultad, IMapa } from '../../models/Mapa';
import { TokenStorageService } from '../token-storage.service';
import { MapaService } from '../mapa/mapa.service';
import { FormsModule } from '@angular/forms';

interface Image {
  name: string;
  src: string;
}

@Component({
  selector: 'app-ver-mapa',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './ver-mapa.component.html',
  styleUrl: './ver-mapa.component.css',
})
export class VerMapaComponent {
  @ViewChild('myCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private squareWidth = 24;
  private squareHeight = 24;
  selectedImage: Image | null = null;
  images: Image[] = [
    { name: 'Image 1', src: '../../facuhdr1.jpeg' },
    { name: 'Image 2', src: '../../facuhdr2.jpg' },
    { name: 'Image 3', src: '../../facuhdr3.jpg' },
  ];
  grid: (Image | null)[][] = [];
  mapa!: IMapa;

  constructor(
    private tokenStorageService: TokenStorageService,
    private mapaService: MapaService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.mapaService.getOneMapa(Number(id)).subscribe((mapa: any) => {
          delete mapa._id;
          this.mapa = mapa;
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
    } else {
      console.error('El contexto 2D no está disponible.');
    }
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

  clonar(){
    console.log(this.mapa);
    const mapaClone: IMapa = {
      ...this.mapa,
      id: -1,
      name: this.mapa.name + " clon",
      likes: 0,
      creator: this.tokenStorageService.getUser(),
      categoria: 'nuevo',      
    };
    this.mapaService.postMapa(mapaClone).subscribe((id: number) => {
      this.router.navigateByUrl(`/editar-mapa/${id}`);
    });
  }

  getImageForDificultad(): string {
    switch (this.mapa.dificultad) {
      case Dificultad.noTesteado:
        return 'noTesteado.png';
      case Dificultad.facil:
        return 'facil.png';
      case Dificultad.normal:
        return 'medio.png';
      case Dificultad.dificil:
        return 'dificil.png';
      default:
        return '';
    }
  }
}
