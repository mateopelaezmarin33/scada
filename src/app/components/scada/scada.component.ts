import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Data } from 'src/app/class/data';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { element } from 'protractor';

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
  interval: NodeJS.Timeout;

  constructor(private storage: StorageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.initGrafic();
  }
  initGrafic() {
    this.storage.getData().subscribe(
      res => {
        this.data = res.map(e => {
          return {
            ...e.payload.doc.data(),
            id: e.payload.doc.id,
          } as Data;
        });
        console.log(this.data);
        am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      let i = 0;
      this.data.forEach(element => {
        data.push({ date: new Date(2018, 0, i++), name: "name", value: element.value});
      });

      chart.data = data;
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
      }
    );
    
  }
  initForm() {
    this.form = this.formBuilder.group({
      temperatura: new FormControl('', Validators.required),
      periodo: new FormControl('', Validators.required),
      voltaje: new FormControl('', Validators.required)
    });
  }

  initProcess() {
    if(this.prendido){
      this.interval =  setInterval(() => {
        const valueForm = this.form.value;
        console.log(this.form.value);
        this.temperaturaActual = valueForm.voltaje * valueForm.periodo + this.temperaturaActual;
        this.storage.saveData(new Data(this.temperaturaActual));
      }, 3000);
    } else {
      alert('debe prender el horno para poder trabajar')
    }
    
  }

  getStatusHorno(change) {
    console.log(change);
    
  }
  on() {
    console.log("vaca");
    this.prendido = true;
  }
  off() {
    this.temperaturaActual = 0;
    this.prendido = false;
    clearInterval(this.interval);
  }
}
