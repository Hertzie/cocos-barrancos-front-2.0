import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable()
export default class EmpleadosService{
    constructor(){

    }

    obtenerEmpleados(){
        return axios.get('http://localhost:3000/empleados').then(resp => resp.data);
    }

    obtenerRoles(){
        return axios.get('http://localhost:3000/roles').then(resp => resp.data);
    }

    registrarEmpleado(nombres : string, paterno : string, materno : string, sueldo : number, rol : number, telefono : string, direccion : string){
        return axios.post('http://localhost:3000/empleado', {
            nombres_empleado : nombres,
            apellido_paterno : paterno,
            apellido_materno : materno,
            sueldo,
            id_rol : rol,
            telefono,
            direccion
        }).then(resp => resp.data);
    }
}