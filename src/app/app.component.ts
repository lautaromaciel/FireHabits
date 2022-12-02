import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';


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
  habitoEnEdicion = {
    titulo: ""
  }
  habitoSeleccionado : any;

  constructor(private http : HttpClient){}

  ngOnInit(): void {

  }

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
        this.actualizarEstadoDeHabitos(this.usuarioActual);
      }
    })

    // this.http.post("http://localhost:8080/api/usuarios", usuario).subscribe(res =>{
    //   console.log(res);
    // })
  }

  actualizarListaDeHabitos(usuarioActual : any){
    this.habitos = [];
    this.http.get<any>(`http://localhost:8080/api/habitos/all/${usuarioActual._id}`)
    .subscribe(res=>{
      if(res && res.habitos.length > 0){
        this.habitos = res.habitos;
      }
    });
  }

  actualizarEstadoDeHabitos(usuarioActual : any){

    const json = {
      "id" : usuarioActual._id
    }

    this.http.put<any>(`http://localhost:8080/api/usuarios/actualizacion`, json)
    .subscribe(()=>{
      this.actualizarListaDeHabitos(usuarioActual);
    });

  }

  agregarHabito(){
    console.log("Agregar Habito");
    const titulo = this.habitoEnEdicion.titulo;
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

  eliminarHabito(habito:any,event:any){

    event.stopPropagation()

    const id = habito._id;
    const json = { "id": id };

    this.http.request("delete","http://localhost:8080/api/habitos",{body:json}).subscribe(res =>{
      console.log(res);
      this.actualizarListaDeHabitos(this.usuarioActual);
    })

  }

  completarHabito(habito:any,event:any){

    event.stopPropagation()

    const id = habito._id;
    // const json = { "id": id };

    this.http.put(`http://localhost:8080/api/habitos/actualizacion/${id}`,{}).subscribe(res =>{
      console.log(res);
      this.actualizarListaDeHabitos(this.usuarioActual);
    })

  }

  /* Visual */
  removerSeleccionesV(){
    const habitoElements = document.querySelectorAll(".lista-habito");
    habitoElements.forEach(elemento=>{
      elemento.classList.remove("lista-habito--selected");
    })
  }

  seleccionarHabito(event : Event,habito:any){
    this.habitoSeleccionado = habito;
    event.stopPropagation();
    const habitoElementSelected = <HTMLDivElement>event.currentTarget;

    this.removerSeleccionesV();

    habitoElementSelected.classList.add("lista-habito--selected");


  }


}


