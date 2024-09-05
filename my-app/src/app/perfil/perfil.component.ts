import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MapaComponent } from '../mapa/mapa.component';
import { IMapa } from '../../models/Mapa';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';
import { MapaService } from '../mapa/mapa.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgFor, MapaComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  mapasGuardados: IMapa[] = [];
  mapasCreados: IMapa[] = [];
  loggedIn: boolean = false;

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private mapaService: MapaService
  ) {}

  ngOnInit() {
    this.loggedIn = this.tokenStorageService.isLoggedIn();
    this.mapaService
      .getMapaFromCreator(this.tokenStorageService.getUser())
      .subscribe((data) => {
        console.log(this.tokenStorageService.getUser());
        this.mapasCreados = data;
      });
  }

  signOut() {
    this.tokenStorageService.singOut();
    this.router.navigateByUrl('').then(() => {
      window.location.reload();
    });
  }

  routerCrearMapa() {
    this.router.navigate(['crear-mapa']);
  }

  routerIniciarSesion() {
    this.router.navigate(['inicio-sesion']);
  }

  routerRegistrarse() {
    this.router.navigate(['registro ']);
  }
}
