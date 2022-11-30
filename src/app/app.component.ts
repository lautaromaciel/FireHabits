import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { catchError, delay, delayWhen, fromEvent, observable, Observable, of, Subject, switchMap, tap, throwError } from 'rxjs';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'habitosAngular';
  listaVisible = false;
  usuarioActual!: any;
  habitos : any[] = [];
  habitoActual = {
    titulo: ""
  }

  constructor(private http : HttpClient){}

  registroUsuario(evento : any){
    const valor : string = evento.target.value;

    const usuario = {
      "nombre" : valor,
      "lista" : [],
    }

    this.http.get<any>(`http://localhost:8080/api/usuarios/${valor}`).pipe(
      switchMap(res =>{
        if(res.usuario){
          return of(res);
        }else{
          return this.http.post<any>("http://localhost:8080/api/usuarios", usuario);
        }
      }),
      catchError(err => {
        console.log(err);
        return of({});
      })
    )
    .subscribe(res =>{
      if(res.usuario){
        this.usuarioActual = res.usuario;
        this.actualizarListaDeHabitos(this.usuarioActual);
      }
    })

    // this.http.post("http://localhost:8080/api/usuarios", usuario).subscribe(res =>{
    //   console.log(res);
    // })
  }

  actualizarListaDeHabitos(usuarioActual : any){
    this.habitos = [];
    this.http.get<any>(`http://localhost:8080/api/habitos/${usuarioActual._id}`)
    .subscribe(res=>{
      if(res && res.habitos.length > 0){
        this.habitos = res.habitos;
      }
    });
  }

  agregarHabito(){
    const titulo = this.habitoActual.titulo;
    const json = {
      "titulo": titulo,
      "racha" : 0,
      "completado" : false,
      "fechas" : [],
      "usuario" : this.usuarioActual._id
    }

    this.http.post("http://localhost:8080/api/habitos",json).subscribe(res =>{
      console.log(res);
      this.actualizarListaDeHabitos(this.usuarioActual);
    })

  }

  eliminarHabito(habito:any){

    const id = habito._id;
    const json = { "id": id };

    this.http.request("delete","http://localhost:8080/api/habitos",{body:json}).subscribe(res =>{
      console.log(res);
      this.actualizarListaDeHabitos(this.usuarioActual);
    })

  }

  completarHabito(habito:any){

    const id = habito._id;
    // const json = { "id": id };

    this.http.put(`http://localhost:8080/api/habitos/actualizacion/${id}`,{}).subscribe(res =>{
      console.log(res);
      this.actualizarListaDeHabitos(this.usuarioActual);
    })

  }

  ngOnInit(): void {

  }

}


