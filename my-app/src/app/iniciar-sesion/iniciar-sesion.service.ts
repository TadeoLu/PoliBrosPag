import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { IUser } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class IniciarSesionService {

  private baseUrl = 'http://127.0.0.1:3000';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

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

  postLogIn(user: IUser): Observable<IUser> {
    const body: any = { user: user };

    return this.http
      .post<IUser>(
        `${this.baseUrl}/api/users/login`,
        body
      )
      .pipe(catchError(this.handleError));
  }

  routerRegistro(){
    
  }
}
