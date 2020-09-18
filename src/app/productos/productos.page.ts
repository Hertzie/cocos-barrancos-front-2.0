import { Component, OnInit } from '@angular/core';
import ProductosService from '../services/productos.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ProductoEditarPage } from '../producto-editar/producto-editar.page';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  private productos : any[] = [];
  constructor(private ps : ProductosService, private alertController : AlertController, private modalController : ModalController) { }

  ngOnInit() {
  }

  async obtenerProductos(){
    this.productos = await this.ps.getProductos();
    console.log("Productos: ", this.productos);
  }

  async presentarNuevoProductoPrompt(){
    const prompt = await this.alertController.create({
      header: "Nuevo producto",
      inputs: [
        {
          name: "nombre",
          type: "text",
          placeholder: "Nombre producto"
        },
        {
          name: "precio",
          type: "number",
          placeholder: "Precio producto"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancelo");
          }
        },
        {
          text: "Guardar",
          handler: async data => {
            if (data.nombre == "" || data.precio == "") {
              this.presentarAlertMensaje(
                "Atención",
                "Debes ingresar todos los campos"
              );
            } else {
              await this.ps.registrarProducto(data.nombre, data.precio);
              this.obtenerProductos();
              this.presentarAlertMensaje(
                "Mensaje",
                "Producto guardado exitosamente"
              );
            }
          }
        }
      ]
    });

    await prompt.present();
  }

  async presentarCancelarPrompt(producto) {
    const prompt = await this.alertController.create({
      header: "Cancelar",
      message: "¿Deseas cancelar/dar de baja este producto?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancelada accion");
          }
        },
        {
          text: "Aceptar",
          handler: async () => {
            const cancelado = await this.ps.cancelarProducto(producto.idu_producto, 0);
            this.presentarAlertMensaje(
              "Mensaje",
              "Producto dado de baja correctamente"
            );
            this.productos = [];
            this.obtenerProductos();
          }
        }
      ]
    });

    await prompt.present();
  }

  async presentarReactivarPrompt(producto) {
    const prompt = await this.alertController.create({
      header: "Reactivar",
      message: "¿Deseas reactivar este producto?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Aceptar",
          handler: async () => {
            const reactivado = await this.ps.cancelarProducto(producto.idu_producto, 1);
            this.presentarAlertMensaje(
              "Mensaje",
              "Producto reactivado correctamente"
            );
            this.productos = [];
            this.obtenerProductos();
          }
        }
      ]
    });

    await prompt.present();
  }

  async presentarEditarModal(producto : any){
    const modal = await this.modalController.create({
      component: ProductoEditarPage,
      componentProps: {
        producto: producto
      }
    });

    modal.onDidDismiss().then(resp => this.obtenerProductos());

    return await modal.present();
  }

  async presentarAlertMensaje(header : string, mensaje : string){
    const alert = await this.alertController.create({
      header: header,
      message: mensaje,
      buttons: ["OK"]
    });

    await alert.present();
  }

  ngAfterContentInit(){
    this.obtenerProductos();
  }

}
