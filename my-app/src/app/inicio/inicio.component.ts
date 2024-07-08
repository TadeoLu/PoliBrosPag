import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapaComponent } from '../mapa/mapa.component';
import { NgFor } from '@angular/common';
import { IMapa } from '../mapa/mapa';
import { Router } from '@angular/router';

@Component({
  selector: 'inicio-root',
  standalone: true,
  imports: [RouterOutlet, MapaComponent, NgFor],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  mapas: IMapa[] = [
    {
      titulo: 'Little island 🏝️',
      creador: 'nicopulvi',
      likes: 3,
      src: '../../facuhdr1.jpeg',
    },
    {
      titulo: 'Sandy Shoes 🌴🐠🌞❄️',
      creador: 'nicopulvi',
      likes: 3,
      src: '../../facuhdr1.jpeg',
    },
  ];

  constructor(private router: Router) {}

  routerPerfil() {
    this.router.navigateByUrl('perfil');
  }

  routerLogIn() {
    this.router.navigateByUrl('inicio-sesion');
  }

  routerSingUp() {
    this.router.navigateByUrl('registro');
  }
}
