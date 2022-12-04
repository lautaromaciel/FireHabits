import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-de-habitos',
  templateUrl: './lista-de-habitos.component.html',
  styleUrls: ['./lista-de-habitos.component.scss']
})
export class ListaDeHabitosComponent implements OnInit {

  @Input() listaDeHabitos : any
  habitoSeleccionado : any;

  constructor() { }

  ngOnInit(): void {
  }

  seleccionar(habito:any){
    this.habitoSeleccionado = habito;
  }

}
