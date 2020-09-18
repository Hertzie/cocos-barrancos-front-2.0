import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable()
export default class PedidosService{
    constructor(){}

    registrarPedido(params : any){
        return axios.post('http://localhost:3000/pedido', params).then(resp => resp.data);
    }

    obtenerPedidos(){
        return axios.get('http://localhost:3000/pedidos').then(resp => resp.data);
    }

    cancelarPedido(iPedido : number){
        return axios.post('http://localhost:3000/pedido/cancelar', {id_pedido : iPedido}).then(resp => resp.data);
    }

    marcarPedidoTerminado(iPedido : number){
        return axios.post('http://localhost:3000/pedido/terminado', {id_pedido : iPedido}).then(resp => resp.data);
    }

    getDetallePedido(iPedido : number){
        return axios.get('http://localhost:3000/pedido/' + iPedido).then(resp => resp.data);
    }

    eliminarProductoPedido(iPedido : number, iProducto : number){
        return axios.post('http://localhost:3000/pedido/eliminar_producto', {id_pedido : iPedido, id_producto : iProducto}).then(resp => resp.data);
    }
}