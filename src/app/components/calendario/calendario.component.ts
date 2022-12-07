import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit, OnChanges {

  @Input() habitoSeleccionado : any;

  fechasMarcadas : any[] = [];
  fechas : any[] = [];
  fechaActual! : any;

  get titulo(){
    if(this.fechaActual){
      return this.fechaActual.format("MMMM YYYY");
    }else return moment().format("MMMM YYYY");
  }

  constructor() { }

  ngOnInit(): void {
    // this.fechasMarcadas = [];
    // this.crearCalendario();
  }
  ngOnChanges(){
    if(this.habitoSeleccionado){
      // let array = []
      this.fechasMarcadas = this.habitoSeleccionado.fechas;
      // for(let i = 0; i<400000;i++){
      //   array.push(moment().add(i,"days"))
      // }
      // this.fechasMarcadas = array;
    }
    this.crearCalendario();
  }

  proximoMes(evento:any){
    evento.preventDefault();
    this.fechaActual.add(1,"month");
    this.fechas = [];
    this.crearCalendario(this.fechaActual);
  }
  mesAnterior(evento:any){
    evento.preventDefault();
    this.fechaActual.subtract(1,"month");
    this.fechas = [];
    this.crearCalendario(this.fechaActual);
  }

  crearCalendario(fecha?:any){
    this.fechas = [];

    const fechaActual = fecha ? fecha : moment();
    this.fechaActual = fechaActual.clone();

    const fechaInicio = fechaActual.clone().startOf("month");
    const fechaFin = fechaActual.clone().endOf("month");
    /* Se pasa el true para que no se trunquen los decimales y devuelva 30.999 */
    const dif  = fechaFin.diff(fechaInicio,"days",true);
    const difReal = Math.round(dif);

    for(let i = 0 ;i < difReal; i++){

      const diaSinFormatear = i != 0 ? fechaInicio.add(1,"days") : fechaInicio;

      const diaFormateado = diaSinFormatear.clone().format();
      const semanaIndex = diaSinFormatear.clone().isoWeekday();

      /* Acá voy a implementar algún algortimo para optimizar el código, ya tengo unas ideas */
      const marca = this.fechasMarcadas.some(fechaM =>{
        return moment(fechaM.substring(0,10)).format("DD MM YYYY") === diaSinFormatear.clone().format("DD MM YYYY");
      });

      const dia = {
        formatoStandar : diaFormateado,
        marca,
        numero : i+1,
        semanaIndex
      }

      this.fechas.push(dia);

    }
  }


}
