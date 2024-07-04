import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';
import { NgFor } from '@angular/common';
import { IMapa } from './mapa/mapa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapaComponent, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router) {}

  routerInicio() {
    this.router.navigateByUrl('');
  }
}
