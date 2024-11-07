import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MapaComponent } from '../mapa/mapa.component';
import { IMapa } from '../../models/Mapa';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';
import { MapaService } from '../mapa/mapa.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgFor, MapaComponent, InfiniteScrollDirective],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  mapasGuardados: IMapa[] = [];
  mapasCreados: IMapa[] = [];
  loggedIn: boolean = false;

  currentPage: number = 1;    // Pagination page number

  scrollDistance: number = 1;
  scrollUpDistance: number = 1;
  throttleTime: number = 300;

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private mapaService: MapaService
  ) {}

  ngOnInit() {
    this.loggedIn = this.tokenStorageService.isLoggedIn();
    this.loadMoreMapas();
  }

  loadMoreMapas(){
    this.mapaService
      .getPageFromCreator(this.tokenStorageService.getUser(), this.currentPage)
      .subscribe((data) => {
        this.mapasCreados = [...this.mapasCreados, ...data];
        this.currentPage++;
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
