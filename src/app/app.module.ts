import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


//Services de aplicación
import AutenticacionService from './services/autenticacion.service';
import UsuarioAutenticado from './services/usuario_autenticado.service';
import ProductosService from './services/productos.service';

//Modales
import { ProductoEditarPage } from './producto-editar/producto-editar.page';

@NgModule({
  declarations: [AppComponent, ProductoEditarPage],
  entryComponents: [ProductoEditarPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AutenticacionService,
    UsuarioAutenticado,
    ProductosService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
