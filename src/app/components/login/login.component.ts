import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { HabitosService } from 'src/app/habitos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuarioActual : any;
  @Output() usuarioRegistrado = new EventEmitter();

  /* Animaciones */
  inputAnimacion = {
    mover : false,
    esconder : false
  }
  get inputVisible(){
    return this.inputAnimacion.esconder == false;
  }
  /*  */

  constructor(public habitosSv : HabitosService) { }

  ngOnInit(): void {
  }

  registroUsuario(evento : any){
    const valor : string = evento.target.value;
    const usuario = {
      "nombre" : valor,
      "lista" : [],
    }
    evento.target.value = "";

    this.habitosSv.getUsuario(valor).pipe(
      /*Devuelve un usuario, si no existe crea uno y lo devuelve */
      switchMap(res => {
        if(res.usuario){
          return of(res);
        }else{
          return this.habitosSv.crearUsuario(usuario);
        }
      }),
      /* Manejo de errores */
      catchError(err => {
        console.log(err);
        return of({});
      })
    )
    .subscribe(res =>{
      if(res.usuario){
        this.usuarioActual = res.usuario;
        this.emitirUsuarioActual();
        this.ocultarInput();
      }
    })
  }

  emitirUsuarioActual(){
    this.usuarioRegistrado.emit(this.usuarioActual);
  }

  cambiarUsuario(){
    this.mostrarInput();
  }


  /* Animaciones */
  ocultarInput(){
    this.inputAnimacion.mover = true;
    setTimeout(()=>{this.inputAnimacion.esconder = true},500);
  }
  mostrarInput(){
    this.inputAnimacion.esconder = false;
    this.inputAnimacion.mover = false;
  }




}
