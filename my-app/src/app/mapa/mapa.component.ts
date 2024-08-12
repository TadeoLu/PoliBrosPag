import { Component, Input } from '@angular/core';
import { IMapa } from '../../models/Mapa';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [NgFor],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
})
export class MapaComponent {
  @Input() item!: IMapa;

  constructor(private router: Router) {}

  verMundo(id: number) {
    this.router.navigateByUrl(`/ver-mapa/${id}`);
  }
}
