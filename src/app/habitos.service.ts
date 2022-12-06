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

  crearHabito(habito:any){
    return this.http.post<any>("http://localhost:8080/api/habitos",habito)
  }

  eliminarHabito(habitoId:any){
    return this.http.request("delete","http://localhost:8080/api/habitos",{body:habitoId});
  }

  actualizarHabito(habitoId:any){
    return this.http.put(`http://localhost:8080/api/habitos/actualizacion/${habitoId}`,{});
  }

  actualizarListadoDeHabitos(usuarioId:any){
    return this.http.get<any>(`http://localhost:8080/api/habitos/all/${usuarioId}`)
  }
  actualizarEstadoDeHabitos(usuarioIdJson:any){
    return this.http.put<any>(`http://localhost:8080/api/usuarios/actualizacion`, usuarioIdJson);
  }



}
