import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';
import { NgFor } from '@angular/common';
import { IMapa } from './mapa/mapa';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapaComponent, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
}
