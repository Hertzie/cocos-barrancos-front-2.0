import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import EmpleadosService from '../services/empleados.service';

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.page.html',
  styleUrls: ['./nuevo-empleado.page.scss'],
})
export class NuevoEmpleadoPage implements OnInit {

  private nombres : string;
  private paterno : string;
  private materno : string;
  private sueldo : number;
  private iRol : number;
  private domicilio : string;
  private telefono : string;

  private roles : any[] = [];

  constructor(private modalController : ModalController, private es : EmpleadosService, private alertController : AlertController) { }

  ngOnInit() {
    this.obtenerRoles();
  }

  cerrarModal(){
    this.modalController.dismiss();
  }

  async obtenerRoles(){
    this.roles = await this.es.obtenerRoles();
  }

  async validarCampos() {
    console.log("Nombre: ", this.nombres);
    console.log("Paterno: ", this.paterno);
    console.log("Materno: ", this.materno);
    console.log("Sueldo: ", this.sueldo);
    console.log("Domicilio: ", this.domicilio);
    console.log("Telefono: ", this.telefono);
    console.log("Rol: ", this.iRol);
    if (
      this.nombres == "" ||
      this.paterno == "" ||
      this.materno == "" ||
      this.sueldo == 0 ||
      this.domicilio == "" ||
      this.telefono == "" ||
      this.iRol == null
    ) {
      this.presentarAlertMensaje("Debes llenar todos los campos");
    } else {
      await this.es.registrarEmpleado(this.nombres, this.paterno, this.materno, this.sueldo, this.iRol, this.telefono, this.domicilio);
      this.modalController.dismiss();
      this.presentarAlertMensaje("Recurso creado correctamente");
    }
  }

  async presentarAlertMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      header: "Mensaje",
      message: mensaje,
      buttons: ["OK"]
    });

    await alert.present();
  }

}
