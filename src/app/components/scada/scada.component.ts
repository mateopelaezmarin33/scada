import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Data } from 'src/app/class/data';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-scada',
  templateUrl: './scada.component.html',
  styleUrls: ['./scada.component.css']
})
export class ScadaComponent implements OnInit {
  form: FormGroup;
  temperaturaActual: number = 0;
  chart: am4charts.XYChart;
  data: Array<Data>;
  prendido: boolean;

  constructor(private storage: StorageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.initGrafic();
  }
  initGrafic() {
    /*this.storage.getData().subscribe(
      res => { 
        /*this.data = res.map(e => {
          return {
            ...e.payload.doc.data(),
            id: e.payload.doc.id,
          } as Data;
        });*/
        console.log(this.data);
        am4core.useTheme(am4themes_animated);

        let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.paddingRight = 20;

        let data = [];
        let visits = 10;
        let i = 0;
        if(this.data) {
          console.log("tiene data");
          
          this.data.forEach(element => {
            data.push({ date: new Date(2018, 0, i++), name: "name", value: element });
          });
          chart.data = data;
        }
        
        chart.dataSource.updateCurrentData = true;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.tooltipText = "{valueY.value}";

        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;

        this.chart = chart;
      //} 
    //);

  }
  initForm() {
    this.form = this.formBuilder.group({
      temperatura: new FormControl('', Validators.required),
      periodo: new FormControl('', Validators.required),
      voltaje: new FormControl('', Validators.required)
    });
  }

  initProcess(encendido: boolean) {
    var num = new Array();
    num[0] = 1.1 * 0.008594;
    num[1] = 1.1 * 0.008548;



    var den = [1.984, -0.9841];



    var Entrada = new Array();
    Entrada[0] = 0;
    Entrada[1] = 1;
    Entrada[2] = 1;
    Entrada[3] = 1;




    var SalidaSis = new Array();
    SalidaSis[0] = 0;
    SalidaSis[1] = 0;
    SalidaSis[2] = 0;
    SalidaSis[3] = 0;



    let i = 3;



    var Referencia = new Array();
    Referencia[0] = 0;
    Referencia[1] = 0;
    Referencia[2] = 0;
    Referencia[i] = 1;



    error = Referencia[i];



    var u = new Array();
    u[0] = 1;
    u[1] = 1;
    u[2] = 1;
    u[3] = 1;



    var error = new Array();
    error[0] = 0;
    error[1] = 0;
    error[2] = 0;
    error[3] = 0;
    error[4] = 0;



    while (i < 400) {
      Referencia[i] = 1;
      SalidaSis[i] = (num[0] * u[i - 1]) + (num[1] * u[i - 2]) + (den[0] * SalidaSis[i - 1]) + (den[1] * SalidaSis[i - 2]);
      i = i + 1;
      u[i] = 1;
    }



    while (i < 800) {
      Referencia[i] = 1;
      SalidaSis[i] = (num[0] * u[i - 1]) + (num[1] * u[i - 2]) + (den[0] * SalidaSis[i - 1]) + (den[1] * SalidaSis[i - 2]);
      i = i + 1;
      u[i] = 0;
    }



    SalidaSis[i] = SalidaSis[i - 1];
    u[i] = 0;



    var t = new Array();
    let j = 0
    while (j < SalidaSis.length) {
      t[j] = j;
      SalidaSis[j] = SalidaSis[j] + 81.5
      j = j + 1;
    }


    console.log(SalidaSis);
   
    

    /*SalidaSis.forEach(element => {

      this.storage.saveData(new Data(element));
    }); */

  }

  getStatusHorno(change) {
    console.log(change);

  }
  on() {
    this.prendido = true;
  }
  off() {
    this.temperaturaActual = 0;
    this.prendido = false;
  }
}
