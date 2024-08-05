import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';
import { NgFor } from '@angular/common';
import { IMapa } from './mapa/mapa';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapaComponent, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  loggedIn: boolean = false;
  
  ngOnInit():void  {
    this.loggedIn = this.tokenStorageService.isLoggedIn();
  }

  
  constructor(private router: Router, private tokenStorageService: TokenStorageService) {}

  routerInicio() {
    this.router.navigateByUrl('');
  }

  routerPerfil() {
    this.router.navigateByUrl('perfil');
  }
}
