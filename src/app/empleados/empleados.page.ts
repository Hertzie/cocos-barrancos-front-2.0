import { Component, OnInit } from '@angular/core';
import EmpleadosService from '../services/empleados.service';
import { ModalController, AlertController } from '@ionic/angular';
import { NuevoEmpleadoPage } from '../nuevo-empleado/nuevo-empleado.page';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  private empleados : any[] = [];

  constructor(private es : EmpleadosService, private modalController : ModalController, private alertController : AlertController) { }

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.obtenerEmpleados();
  }

  async obtenerEmpleados(){
    this.empleados = await this.es.obtenerEmpleados();
    console.log("Empleados: ", this.empleados);
  }

  async presentarPromptEmpleadoNuevo(){
    const modal = await this.modalController.create({
      component: NuevoEmpleadoPage
    });

    modal.onDidDismiss().then(data => {
      this.obtenerEmpleados();
    });

    return await modal.present();
  }

}
