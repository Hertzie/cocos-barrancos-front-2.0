import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import ConfiguracionesService from '../services/configuraciones.service';
import ProductosService from '../services/productos.service';
import PedidosService from '../services/pedidos.service';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.page.html',
  styleUrls: ['./nuevo-pedido.page.scss'],
})
export class NuevoPedidoPage implements OnInit {
  private tipoServicios : any[];
  private servicioSeleccionado : any;
  private mesaSeleccionada : any;
  private nombreCliente : string;
  private mesas : any[];
  private productos : any[];
  private productosPedido : any[] = [];
  constructor(private modalController : ModalController, 
              private cs : ConfiguracionesService, 
              private ps : ProductosService, 
              private alertController : AlertController, 
              private pedidos : PedidosService,
              private toastController : ToastController
  ) { }

  ngOnInit() {
    this.obtenerTipoServicios();
    this.obtenerProductos();
    this.obtenerMesas();
  }

  async cerrarModal(){
    if(this.productosPedido.length){
      const prompt = await this.alertController.create({
        header : 'Cerrar pedido',
        message : '¿Está seguro de cerrar el pedido? Aún no se ha registrado.',
        buttons : [
          {
            text : 'Cancelar',
            role : 'cancel'
          },
          {
            text : 'Aceptar',
            handler : () => {
              this.modalController.dismiss();
            }
          }
        ]
      });

      await prompt.present();
      return;
    }
    this.modalController.dismiss();
  }

  async obtenerTipoServicios(){
    this.tipoServicios = await this.cs.getTipoServicio();
    console.log("Servicios cargados: ", this.tipoServicios);
  }

  async obtenerProductos(){
    this.productos = await this.ps.getProductos();
    console.log("Productos: ", this.productos);
  }

  async obtenerMesas(){
    this.mesas = await this.cs.getMesas();
    console.log("Mesas: ", this.mesas);
  }

  async presentarAgregarProductoPrompt(){
    const productos : any[] = this.productos.map( p => {return {id_producto : p.idu_producto, nombre_producto : p.desc_producto}});
    const nombreBase : string = 'producto';
    let productosPrompt : any[] = productos.map( p => {
      return {
        name : `${nombreBase}${p.id_producto}`,
        type : 'radio',
        label : p.nombre_producto,
        value : p.id_producto
      }
    });

    productosPrompt = productosPrompt.filter( p => !this.productosPedido.find( pr => pr.id_producto == p.value));

    const alert = await this.alertController.create({
      header : 'Elija el producto',
      inputs : productosPrompt,
      buttons : [
        {
          text : 'Cancelar',
          role : 'cancel'
        },
        {
          text : 'Agregar',
          handler : (data) => {
            if(!data){
              this.presentarAlertMensaje('Atención', 'Debe seleccionar un producto');
              return;
            }
            
            const productoSeleccionado = this.productos.find( p => p.idu_producto == data);
            this.productosPedido.push({
              id_producto : productoSeleccionado.idu_producto,
              costo_unidad : productoSeleccionado.producto_precio,
              nombre_producto : productoSeleccionado.desc_producto,
              cantidad : 1
            });

            console.log(this.productosPedido);
            
          }
        }
      ]
    });

    await alert.present();
  }

  async registrarPedido(){

    const id_empleado = JSON.parse(localStorage.getItem('usuario')).idu_empleado;
    const id_mesa = (this.servicioSeleccionado == 1 && this.mesaSeleccionada) ? this.mesaSeleccionada : 0;//this.mesaSeleccionada;
    const id_tipo_servicio = this.servicioSeleccionado;  
    const cliente = this.nombreCliente;
    const productos = this.productosPedido.map( p => p.id_producto );
    const cantidades = this.productosPedido.map( p => p.cantidad );
    const precios = this.productosPedido.map( p => p.costo_unidad );
    const objData = {
       id_empleado,
       id_mesa,
       id_tipo_servicio,
       cliente,
       productos,
       cantidades,
       precios
    };

    const promptRegistrar = await this.alertController.create({
      header : 'Registrar pedido',
      message : '¿Confirma registrar el pedido?',
      buttons : [
        {
          text : 'Cancelar',
          role : 'cancel'
        },
        {
          text : 'Aceptar',
          handler : async() => {
            const response = await this.pedidos.registrarPedido(objData);
            if(response[0].success){
              const toast = await this.toastController.create({
                message : 'Pedido registado correctamente',
                duration : 2000
              });

              toast.present();
              this.modalController.dismiss();
            }
          }
        }
      ]
    });

    await promptRegistrar.present();
  }
  
  async elimininarProductoPedido(producto){
    const eliminarProductoPrompt = await this.alertController.create({
      header : 'Eliminar Producto',
      message : `¿Desea eliminar el producto ${producto.nombre_producto} del pedido`,
      buttons : [
        {
          text : 'Cancelar',
          role : 'cancel'
        },
        {
          text : 'Eliminar',
          handler : () => {
            this.productosPedido = this.productosPedido.filter( p => p.id_producto != producto.id_producto );
          }
        }
      ]
    });

    await eliminarProductoPrompt.present();
  }

  async presentarAlertMensaje(header : string, mensaje : string){
    const alert = await this.alertController.create({
      header: header,
      message: mensaje,
      buttons: ["OK"]
    });

    await alert.present();
  }

  incrementarCantidadProducto(producto){
    producto.cantidad++;
  }

  async decrementarCantidadProducto(producto){
    if(producto.cantidad == 1){
      const prompt = await this.alertController.create({
        header : 'Producto',
        message : `El producto ${producto.nombre_producto} se eliminará.`,
        buttons : [
          {
            text : 'Cancelar',
            role : 'cancel'
          },
          {
            text : 'Aceptar',
            handler : () => {
              this.productosPedido = this.productosPedido.filter( p => p.id_producto != producto.id_producto );
            }
          }
        ]
      });

      await prompt.present();
      return;
    }

    producto.cantidad--;
  }

}
