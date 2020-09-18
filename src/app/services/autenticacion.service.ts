import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export default class AutenticacionService {
  private urlService : string = 'http://localhost:3000/login';
  private urlPaginas : string = 'http://localhost:3000/configuraciones/paginas';

  constructor(private http : HttpClient) { 

  }

  login(nombre_usuario : string, contrasena : string) : Observable<any>{
    return this.http.post<any>(this.urlService, {nombre_usuario, contrasena});
  }

  getPaginasRol(iRol){
    return axios.post(this.urlPaginas, {id_rol : iRol}).then(resp => resp.data);
  }
}
