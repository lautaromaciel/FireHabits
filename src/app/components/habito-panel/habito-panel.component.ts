import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HabitosService } from 'src/app/habitos.service';

@Component({
  selector: 'app-habito-panel',
  templateUrl: './habito-panel.component.html',
  styleUrls: ['./habito-panel.component.scss']
})
export class HabitoPanelComponent implements OnInit,OnChanges {

  panel : string = "agregar";
  tituloActual! : string ;
  @Input() usuarioActual : any;
  @Input() habitoSeleccionado : any;
  @Output() seAgregoHabito = new EventEmitter();
  @Output() seActualizoHabito = new EventEmitter();

  constructor(private habitosSv : HabitosService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.habitoSeleccionado){
      this.cambiarPanel("actualizar");
    }else{
      this.tituloActual = "";
      this.cambiarPanel("agregar");
    }
  }

  agregarHabito(){

    const titulo = this.tituloActual;

    const json = {
      "titulo": titulo,
      "racha" : 0,
      "completado" : false,
      "fechas" : [],
      "usuario" : this.usuarioActual._id
    }

    this.habitosSv.crearHabito(json).subscribe(habito =>{
      this.seAgregoHabito.emit(habito);
    })

  }

  completarHabitoActual(){
    const id = this.habitoSeleccionado._id;
    this.habitosSv.actualizarHabito(id).subscribe(res=>{
      this.seActualizoHabito.emit("");
    })
  }

  /* Funciones Visuales */
  cambiarPanel(accion :string){
    this.panel = accion;
  }

  definirTitulo(evento:any){
    this.tituloActual = evento.target.value;
  }
  editarTitulo(){
    this.tituloActual = "";
  }

}
