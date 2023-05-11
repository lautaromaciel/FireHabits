import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitosService {
  constructor(private http : HttpClient ) { }

  getUsuario(usuarioNombre:string){
    return this.http.get<any>(`https:fireHabits.online/api/usuarios/${usuarioNombre}`);
  }

  crearUsuario(usuario:any){
    return this.http.post<any>("https:fireHabits.online/api/usuarios", usuario);
  }

  crearHabito(habito:any){
    return this.http.post<any>("https:fireHabits.online/api/habitos",habito)
  }

  eliminarHabito(habitoId:any){
    return this.http.request("delete","https:fireHabits.online/api/habitos",{body:habitoId});
  }

  actualizarHabito(habitoId:any){
    return this.http.put(`https:fireHabits.online/api/habitos/actualizacion/${habitoId}`,{});
  }

  actualizarListadoDeHabitos(usuarioId:any){
    return this.http.get<any>(`https:fireHabits.online/api/habitos/all/${usuarioId}`)
  }
  actualizarEstadoDeHabitos(usuarioIdJson:any){
    return this.http.put<any>(`https:fireHabits.online/api/usuarios/actualizacion`, usuarioIdJson);
  }



}
