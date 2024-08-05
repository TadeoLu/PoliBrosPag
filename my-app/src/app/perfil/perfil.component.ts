import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MapaComponent } from '../mapa/mapa.component';
import { IMapa } from '../mapa/mapa';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';

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

  constructor(private router: Router, private tokenStorageService: TokenStorageService) {}

  signOut(){
    this.tokenStorageService.singOut();
    this.router.navigateByUrl('');
  }

  routerCrearMapa() {
    this.router.navigateByUrl('crear-mapa');
  }
}
