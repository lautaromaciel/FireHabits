import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

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
    const dia1 = moment().format();
    const dia2 = moment().add(5,"day").format();
    const dia3 = moment().add(10,"day").format();
    const dia4 = moment().add(15,"day").format();
    const dia5 = moment().add(20,"day").format();
    const dia6 = moment().add(25,"day").format();
    const dia7 = moment().add(30,"day").format();

    this.fechasMarcadas.push(dia1,dia2,dia3,dia4,dia5,dia6,dia7);
    // console.log(this.fechas);
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

    const fechaActual = fecha ? fecha : moment();
    this.fechaActual = fechaActual.clone();

    const fechaInicio = fechaActual.clone().startOf("month");
    const fechaFin = fechaActual.clone().endOf("month");
    /* Se pasa el true para que no se trunquen los decimales y devuelva 30.999 */
    const dif  = fechaFin.diff(fechaInicio,"days",true);
    const difReal = Math.round(dif);

    for(let i = 0 ;i < difReal; i++){

      const diaSinFormatear = i != 0 ? fechaActual.add(1,"days") : fechaActual;
      const diaFormateado = diaSinFormatear.clone().format();
      const semanaIndex = diaSinFormatear.clone().isoWeekday();
      const marca = this.fechasMarcadas.includes(diaFormateado);

      const dia = {
        formatoStandar : diaFormateado,
        marca,
        numero : i+1,
        semanaIndex
      }

      this.fechas.push(dia);

    }
    console.log(this.fechas)
  }


}
