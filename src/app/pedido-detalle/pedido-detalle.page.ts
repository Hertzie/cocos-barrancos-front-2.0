import { Component, OnInit } from '@angular/core';
import PedidosService from '../services/pedidos.service';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import ProductosService from '../services/productos.service';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.page.html',
  styleUrls: ['./pedido-detalle.page.scss'],
})
export class PedidoDetallePage implements OnInit {
  private pedido : any;
  private pedidoDetalle : any[] = [];
  private productos : any[] = [];

  constructor(private ps : PedidosService, 
              private alertController : AlertController, 
              private modalController : ModalController, 
              private navParams : NavParams,
              private productosService : ProductosService) { }

  ngOnInit() {
    this.obtenerProductos();
    this.pedido = this.navParams.get('pedido');
    console.log("Pedido en detalle: ", this.pedido);
    this.obtenerDetallePedido();
    
  }

  cerrarModal(){
    this.modalController.dismiss();
  }

  async obtenerDetallePedido(){
    const response = await this.ps.getDetallePedido(this.pedido.idu_pedido);
    this.pedidoDetalle = response.data;
    console.log("Detalle pedido: ", this.pedidoDetalle);
  }

  async obtenerProductos(){
    this.productos = await this.productosService.getProductos();
    console.log("Productos: ", this.productos);
  }

  async eliminarProductoPedido(producto : any){
    const iPedido = this.pedido.idu_pedido;
    const iProducto = producto.idu_producto;

    const eliminarPrompt = await this.alertController.create({
      header : 'Eliminar producto',
      message : `¿Desea eliminar el producto ${producto.desc_producto} del pedido?`,
      buttons : [
        {
          text : 'Cancelar',
          role : 'cancel'
        },
        {
          text : 'Aceptar',
          handler : () => {
            console.log("Eliminar producto");
          }
        }
      ]
    });

    await eliminarPrompt.present();
  }

}
