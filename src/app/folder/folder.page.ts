import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { proxyMethods } from '@ionic/angular/directives/proxies-utils';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  private usuario : any;
  constructor(private activatedRoute: ActivatedRoute, private router : Router, private alertController : AlertController, private navController : NavController) { 
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async presentarlogoutPrompt(){
    const prompt = await this.alertController.create({
      header : 'Salir',
      message : '¿Deseas salir de la aplicación?',
      buttons : [
        {
          text : 'Cancelar',
          role : 'cancel'
        },
        {
          text : 'Aceptar',
          handler : () => {
            this.cerrarSesion();
          }
        }
      ]
    });

    await prompt.present();
  }

  cerrarSesion(){
    localStorage.removeItem('usuario');
    //this.router.navigateByUrl('login');
    this.navController.navigateRoot('/login');
  }
}
