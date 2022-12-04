import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-habito-panel',
  templateUrl: './habito-panel.component.html',
  styleUrls: ['./habito-panel.component.scss']
})
export class HabitoPanelComponent implements OnInit {

  panel : string = "agregar";
  tituloActual! : string ;

  constructor() { }

  ngOnInit(): void {
  }

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
