import { Component, OnInit} from '@angular/core';

import { Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import UsuarioAutenticado from './services/usuario_autenticado.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  private usuario : any;

  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Productos',
      url: '/productos',
      icon: 'paper-plane'
    },
    {
      title : 'Empleados',
      url : '/empleados',
      icon : 'paper-plane'
    },
    {
      title : 'Usuarios',
      url : '/usuarios',
      icon : 'paper-plane'
    },
    {
      title : 'Pedidos',
      url : '/pedidos',
      icon : 'paper-plane'
    }
  ];
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private usuarioService : UsuarioAutenticado
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  get usuarioLogeado(){
    return this.usuarioService.obtenerUsuario().empleado_nombres;
  }

  get rolUsuario(){
    return this.usuarioService.obtenerUsuario().desc_rol;
  }

  get paginasUsuario(){
    return this.usuarioService.obtenerPaginas();
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    this.usuario = JSON.parse(localStorage.getItem('usuario'));


  }
}
