import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapaComponent } from '../mapa/mapa.component';
import { NgFor } from '@angular/common';
import { IMapa } from '../mapa/mapa';



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
      src: './pene.jpeg',
    },
    {
      titulo: 'Sandy Shores 🌴🐠🌞❄️',
      creador: 'nicopulvi',
      likes: 3,
      src: 'pene.jpeg',
    },
  ];
}
