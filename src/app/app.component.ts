import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { HabitosService } from './habitos.service';


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

  constructor(private http : HttpClient,private habitosSv :HabitosService){}

  ngOnInit(): void {

  }

  actualizarListaDeHabitos(){
    const id = this.usuarioActual._id;
    this.habitos = [];
    this.habitosSv.actualizarListadoDeHabitos(id).subscribe(res=>{
      if(res && res.habitos.length > 0){
        this.habitos = res.habitos;
        this.recuperarSeleccionAnterior();
      }
    });
  }
  actualizarEstadoDeHabitos(usuarioActual : any){

    const json = {
      "id" : usuarioActual._id
    }

    this.habitosSv.actualizarEstadoDeHabitos(json).subscribe(()=>{
      this.actualizarListaDeHabitos();
    });



  }

  setUsuario(usuario:any){
    this.habitoSeleccionado = null;
    this.usuarioActual = usuario;
    this.actualizarEstadoDeHabitos(usuario);
  }
  setHabito(habito:any){
    this.habitoSeleccionado = habito;
  }
  recuperarSeleccionAnterior(){
    if(this.habitoSeleccionado){

      this.habitos.forEach(habito =>{
        if(habito._id == this.habitoSeleccionado._id){
          this.habitoSeleccionado = habito;
        }
      })

    }
  }






}


