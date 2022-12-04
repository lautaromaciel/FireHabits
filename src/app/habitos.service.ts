import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitosService {
  constructor(private http : HttpClient ) { }

  getUsuario(usuarioNombre:string){
    return this.http.get<any>(`http://localhost:8080/api/usuarios/${usuarioNombre}`);
  }

  crearUsuario(usuario:any){
    return this.http.post<any>("http://localhost:8080/api/usuarios", usuario);
  }



}
