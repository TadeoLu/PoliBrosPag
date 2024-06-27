import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CrearMapaComponent } from './crear-mapa/crear-mapa.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'crear-mapa', component: CrearMapaComponent },
];
