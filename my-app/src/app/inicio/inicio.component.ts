import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapaComponent } from '../mapa/mapa.component';
import { NgFor } from '@angular/common';
import { IMapa } from '../mapa/mapa';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'inicio-root',
  standalone: true,
  imports: [RouterOutlet, MapaComponent, NgFor],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit{
  mapas: IMapa[] = [
    {
      titulo: 'Little island 🏝️',
      creador: 'nicopulvi',
      likes: 3,
      src: '../../facuhdr1.jpeg',
      categoria: 'nuevo',
    },
    {
      titulo: 'Sandy Shoes 🌴🐠🌞❄️',
      creador: 'nicopulvi',
      likes: 3,
      src: '../../facuhdr1.jpeg',
      categoria: 'nuevo',
    },
    {
      titulo: 'Crazy Honey 🌴🐠🌞❄️',
      creador: 'ttomicas',
      likes:66,
      src: '../../facuhdr1.jpeg',
      categoria: 'popular',
    },
  ];
  filteredMapas: IMapa[] =[];
  loggedIn: boolean = false;
  
  ngOnInit() {
    this.filtrarMapas('popular'); // Mostrar mapas populares por defecto
    this.loggedIn = this.tokenStorageService.isLoggedIn();
    
  }

  
  constructor(private router: Router, private tokenStorageService: TokenStorageService) {}

  filtrarMapas(categoria: string) {
    if (categoria === 'popular') {
      this.filteredMapas = this.mapas.filter(mapa => mapa.categoria === 'popular');
    } else if (categoria === 'nuevo') {
      this.filteredMapas = this.mapas.filter(mapa => mapa.categoria === 'nuevo');
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
