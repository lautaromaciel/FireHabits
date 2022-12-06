import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HabitosService } from 'src/app/habitos.service';


@Component({
  selector: 'app-lista-de-habitos',
  templateUrl: './lista-de-habitos.component.html',
  styleUrls: ['./lista-de-habitos.component.scss']
})
export class ListaDeHabitosComponent implements OnInit {

  @Input() listaDeHabitos : any;
  @Output() seEliminoHabito = new EventEmitter();
  @Output() seSeleccionoHabito = new EventEmitter();
  @Input() habitoSeleccionado : any;


  constructor(private habitosSv :HabitosService ,public dialog : MatDialog) { }

  ngOnInit(): void {
  }

  seleccionar(habito:any){
    if(habito == this.habitoSeleccionado){
      this.habitoSeleccionado = null;
      this.seSeleccionoHabito.emit(this.habitoSeleccionado);
    }else{
      this.habitoSeleccionado = habito;
      this.seSeleccionoHabito.emit(this.habitoSeleccionado);
    }
  }

  abrirModal(habito:any ,event:any){

    event.stopPropagation();

    let dialogRef = this.dialog.open(eliminarHabitoModal, {
      height: '250px',
      width: '400px',
    }).afterClosed().subscribe(res =>{
      if(res) this.eliminarHabito(habito)
    })

  }

  eliminarHabito(habito:any){

    const id = habito._id;
    const json = { "id": id };

    this.habitosSv.eliminarHabito(json).subscribe( res =>{
      this.seEliminoHabito.emit(res);
      if(this.habitoSeleccionado && this.habitoSeleccionado._id == id){
        this.seSeleccionoHabito.emit(null);
      }
    })

  }

}



@Component({
  selector:'eliminar-habito-modal',
  templateUrl: "./eliminar-habito-modal.html"
})
export class eliminarHabitoModal {
  constructor( public dialogRef: MatDialogRef<eliminarHabitoModal>) { }

  cerrarModal(){
    this.dialogRef.close();
  }
  confirmarEliminacion(){
    this.dialogRef.close(true);
  }

}
