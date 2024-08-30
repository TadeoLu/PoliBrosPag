import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CrearMapaComponent } from './crear-mapa/crear-mapa.component';
import { PerfilComponent } from './perfil/perfil.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { VerMapaComponent } from './ver-mapa/ver-mapa.component';
import { EditarMapaComponent } from './editar-mapa/editar-mapa.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'ver-mapa/:id', component: VerMapaComponent },
  { path: 'crear-mapa', component: CrearMapaComponent },
  { path: 'editar-mapa/:id', component: EditarMapaComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'inicio-sesion', component: IniciarSesionComponent },
  { path: 'registro', component: RegistroComponent },
];
