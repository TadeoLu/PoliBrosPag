import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapaComponent } from '../mapa/mapa.component';
import { NgFor } from '@angular/common';
import { IMapa } from '../../models/Mapa';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';
import { MapaService } from '../mapa/mapa.service';

@Component({
  selector: 'inicio-root',
  standalone: true,
  imports: [RouterOutlet, MapaComponent, NgFor],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  mapas: IMapa[] = [];
  filteredMapas: IMapa[] = [];
  loggedIn: boolean = false;
  marioSrc: string = '../../../media/mario2.png';

  ngOnInit() {
    this.mapaService.getMapas().subscribe((data) => {
      this.mapas = data;
      this.filtrarMapas('nuevo');
    }); // Mostrar mapas populares por defecto
    this.loggedIn = this.tokenStorageService.isLoggedIn();
  }

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private mapaService: MapaService
  ) {}

  filtrarMapas(categoria: string) {
    if (categoria === 'popular') {
      this.filteredMapas = this.mapas.filter(
        (mapa) => mapa.categoria === 'popular'
      );
    } else if (categoria === 'nuevo') {
      this.filteredMapas = this.mapas.filter(
        (mapa) => mapa.categoria === 'nuevo'
      );
    }
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
