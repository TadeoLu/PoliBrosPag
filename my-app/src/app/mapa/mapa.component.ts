import { Component, Input } from '@angular/core';
import { IMapa } from './mapa';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [NgFor],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
})
export class MapaComponent {
  @Input() item!: IMapa;
}
