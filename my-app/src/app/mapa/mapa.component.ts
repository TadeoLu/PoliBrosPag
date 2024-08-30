import { Component, Input } from '@angular/core';
import { IMapa } from '../../models/Mapa';
import { NgFor, NgStyle } from '@angular/common';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { MapaService } from './mapa.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [NgFor, NgStyle],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
})
export class MapaComponent {
  @Input() item!: IMapa;
  mostrarBorrar: boolean = false;
  borrado: boolean = false;
  isVisible: boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private mapaService: MapaService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit() {
    this.activatedRoute.url.subscribe((urlSegments: UrlSegment[]) => {
      if (urlSegments[0].path == 'perfil') {
        this.mostrarBorrar = true;
      }
    });
  }

  borrarMapa() {
    this.mapaService.deleteMapa(this.item.id).subscribe(() => {
      window.location.reload();
    });
  }

  togglePopup() {
    this.borrado = !this.borrado;
    this.isVisible = !this.isVisible; // Alterna la visibilidad
  }

  verMundo(id: number) {
    if (
      this.item.creator.username == this.tokenStorageService.getUser().username
    ) {
      this.router.navigateByUrl(`/editar-mapa/${id}`);
    } else {
      setTimeout(() => {
        if (!this.borrado) {
          this.router.navigateByUrl(`/ver-mapa/${id}`);
        }
      }, 30);
    }
  }
}
