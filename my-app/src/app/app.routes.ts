import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CrearMapaComponent } from './crear-mapa/crear-mapa.component';
import { PerfilComponent } from './perfil/perfil.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import path from 'path';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'crear-mapa', component: CrearMapaComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: "inicio-sesion", component: IniciarSesionComponent},
  { path: "registro", component: RegistroComponent}
];
