import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { IMapa } from '../../models/mapa';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  private baseUrl = 'http://127.0.0.1:3000';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  getMapas(): Observable<IMapa[]> {
    return this.http
      .get<IMapa[]>(
        `${this.baseUrl}/api/mapas`
      )
      .pipe(catchError(this.handleError));
  }

  postMapa(mapa: IMapa): Observable<IMapa> {
    const body = { mapa: mapa}
    return this.http
      .post<IMapa>(
        `${this.baseUrl}/api/mapas`,
        body,
        { headers: this.tokenStorageService.header() }
      )
      .pipe(catchError(this.handleError));
  }
}
