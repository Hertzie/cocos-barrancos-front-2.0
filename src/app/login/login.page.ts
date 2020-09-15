import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AutenticacionService from '../services/autenticacion.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private usuario : string;
  private contrasena : string

  constructor(private router: Router, private autenticacion : AutenticacionService, private alertController : AlertController) { }

  ngOnInit() {
  }

  async presentarAlertMensaje(header : string, mensaje : string){
    const alert = await this.alertController.create({
      header : header,
      message : mensaje,
      buttons : ['Aceptar']
    });

    await alert.present();
  }

  validarCampos(){
    if(!this.usuario || this.usuario == '' || this.contrasena == '' || !this.contrasena){
      this.presentarAlertMensaje('Campos incompletos', 'Debes llenar ambos campos');
      return;
    }
    this.iniciarSesion();
  }

  iniciarSesion(){
    this.autenticacion.login(this.usuario, this.contrasena).subscribe(data => {
      switch(data.codigo){
        case 1:
          this.usuario = '';
          this.contrasena = '';
          localStorage.setItem('usuario', JSON.stringify(data.datos_usuario));
          this.router.navigateByUrl('folder/inbox');
          break;
        case 2:
          this.presentarAlertMensaje('Contraseña incorrecta', data.mensaje);
          break;
        case 3:
          this.presentarAlertMensaje('Datos incorrectos', data.mensaje);
          break;
      }
    });
  }
}
