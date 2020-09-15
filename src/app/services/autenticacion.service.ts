import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export default class AutenticacionService {
  private urlService : string = 'http://localhost:3000/login';

  constructor(private http : HttpClient) { 

  }

  login(nombre_usuario : string, contrasena : string) : Observable<any>{
    return this.http.post<any>(this.urlService, {nombre_usuario, contrasena});
  }
}
