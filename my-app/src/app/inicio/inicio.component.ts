import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapaComponent } from '../mapa/mapa.component';
import { NgFor } from '@angular/common';
import { IMapa } from '../../models/Mapa';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';
import { MapaService } from '../mapa/mapa.service';
import { map } from 'rxjs';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'inicio-root',
  standalone: true,
  imports: [RouterOutlet, MapaComponent, NgFor, InfiniteScrollDirective],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  mapas: IMapa[] = [];
  filteredMapas: IMapa[] = [];
  loggedIn: boolean = false;
  marioSrc: string = '../../../media/mario2.png';

  currentPage: number = 1;    // Pagination page number

  scrollDistance: number = 1;
  scrollUpDistance: number = 1;
  throttleTime: number = 300;

  ngOnInit() {
    this.loadMoreMapas();
    this.loggedIn = this.tokenStorageService.isLoggedIn();
  }

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private mapaService: MapaService
  ) {}

  filtrarMapas(categoria: string) {
    if (categoria === 'popular') {
      this.filteredMapas = this.mapas.filter((mapa) => mapa.likes > 20);
      this.filteredMapas.sort((a, b) => b.likes - a.likes);
    } else if (categoria === 'nuevo') {
      this.filteredMapas = this.mapas.filter(
        (mapa) => mapa.categoria === 'nuevo'
      );
    }
  }

  loadMoreMapas(){
    this.mapaService.getPage(this.currentPage).subscribe((data) => {
      this.mapas = [...this.mapas, ...data];
      this.currentPage++; 
      this.filtrarMapas('nuevo');
    }); 
  }

  routerPerfil() {
    this.router.navigateByUrl('perfil');
  }

  routerCrearMapa() {
    this.router.navigateByUrl('crear-mapa');
  }

  routerLogIn() {
    this.router.navigateByUrl('inicio-sesion');
  }

  routerSingUp() {
    this.router.navigateByUrl('registro');
  }
}
