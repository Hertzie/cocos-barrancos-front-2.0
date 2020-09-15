import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import ProductosService from '../services/productos.service';

@Component({
  selector: 'app-producto-editar',
  templateUrl: './producto-editar.page.html',
  styleUrls: ['./producto-editar.page.scss'],
})
export class ProductoEditarPage implements OnInit {
  private producto : any;
  constructor(private modalController : ModalController, private navParams : NavParams, private ps : ProductosService, private alertController : AlertController) { 
    this.producto = this.navParams.get('producto');
    console.log("Producto en modal: ", this.producto);
  }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalController.dismiss();
  }

  async editarProducto(){
    await this.ps.editarProducto(this.producto.idu_producto, this.producto.desc_producto, this.producto.producto_precio);
    this.presentarProductoActualizadoAlert();
    this.modalController.dismiss();
  }

  async presentarProductoActualizadoAlert() {
    const alert = await this.alertController.create({
      header: "Mensaje",
      message: "El producto ha sido actualizado correctamente",
      buttons: ["OK"]
    });

    await alert.present();
  }

}
