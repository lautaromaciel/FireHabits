import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HabitosService } from 'src/app/habitos.service';

@Component({
  selector: 'app-habito-panel',
  templateUrl: './habito-panel.component.html',
  styleUrls: ['./habito-panel.component.scss']
})
export class HabitoPanelComponent implements OnInit {

  panel : string = "agregar";
  tituloActual! : string ;
  @Input() usuarioActual : any;
  @Output() seAgregoHabito = new EventEmitter();

  constructor(private habitosSv : HabitosService) { }

  ngOnInit(): void {
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











  /* Funciones Visuales */
  cambiarPanel(accion :string){
    this.panel = accion;
  }

  definirTitulo(evento:any){
    this.tituloActual = evento.target.value;
    console.log(this.tituloActual);
  }
  editarTitulo(){
    this.tituloActual = "";
  }

}
