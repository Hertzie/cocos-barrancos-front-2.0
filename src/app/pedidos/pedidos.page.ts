import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { NuevoPedidoPage } from '../nuevo-pedido/nuevo-pedido.page';
import PedidosService from '../services/pedidos.service';
import { PedidoDetallePage } from '../pedido-detalle/pedido-detalle.page';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  private pedidos : any[] = [];
  private estatusPedidos : string;

  constructor(private modalController : ModalController, private alertController : AlertController, private ps : PedidosService, private toast : ToastController) { }

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.obtenerPedidos();
  }

  async presentarNuevoPedidoModal(){
      const modal = await this.modalController.create({
        component: NuevoPedidoPage
      });
  
      modal.onDidDismiss().then(data => {
        this.obtenerPedidos();
      });
  
      return await modal.present();
  }

  async obtenerPedidos(){
    this.pedidos = await this.ps.obtenerPedidos();
    console.log("Pedidos: ", this.pedidos);
  }

  async cancelarPedido(pedido){
    const cancelarPrompt = await this.alertController.create({
      header : 'Cancelar pedido',
      message : '¿Desea cancelar el pedido?',
      buttons : [
        {
          text : 'Cancelar',
          role : 'cancel'
        },
        {
          text : 'Aceptar',
          handler : async() => {
            await this.ps.cancelarPedido(pedido.idu_pedido);
            const mensaje = await this.toast.create({
              message : 'Pedido cancelado correctamente',
              duration : 2000
            });

            await mensaje.present();

            this.obtenerPedidos();
          }
        }
      ]
    });

    await cancelarPrompt.present();
  }

  async verDetallePedido(pedido){
    const modal = await this.modalController.create({
      component : PedidoDetallePage,
      componentProps : {
        pedido : pedido
      }
    });

    await modal.present();
  }

}
