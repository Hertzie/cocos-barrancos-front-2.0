import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Injectable()
export default class ProductosService{
    private urlService = 'http://localhost:3000/productos';

    constructor(private http : HttpClient){}

    getProductos(){
        return axios.get(this.urlService).then(resp => resp.data.data);
    }

    registrarProducto(nombreProducto : string, precioProducto : number){
        return axios.post('http://localhost:3000/producto', {nombre_producto : nombreProducto, precio_producto : precioProducto}).then(resp => resp.data);
    }

    cancelarProducto(iProducto : number, iOpcion : number){
        return axios.post('http://localhost:3000/producto/baja_reactivar', {id_producto : iProducto, iOpcion}).then(resp => resp.data);
    }

    editarProducto(iProducto : number, nombreProducto : string, precioProducto : number){
        return axios.post('http://localhost:3000/producto/editar', {id_producto : iProducto, nombre_producto : nombreProducto, precio_producto : precioProducto}).then(resp => resp.data);
    }
}