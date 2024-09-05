import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';
import { NgFor } from '@angular/common';
import { IMapa } from '../models/Mapa';
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
export class AppComponent implements OnInit {
  loggedIn: boolean = false;

  ngOnInit(): void {
    this.loggedIn = this.tokenStorageService.isLoggedIn();
  }

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute
  ) {}

  routerInicio() {
    this.router.navigateByUrl('#inicio');
  }

  routerPerfil() {
    this.router.navigateByUrl('perfil');
  }
  irMapa() {
    this.router.navigateByUrl('/inicio#mapasContainer').then(() => {
      this.route.fragment.subscribe((fragment) => {
        if (fragment) {
          // Aquí puedes manejar el fragmento, por ejemplo, hacer scroll hacia el elemento
          const element = document.getElementById(fragment);
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth' });
            }, 70);
          }
        }
      });
    });
  }
}
