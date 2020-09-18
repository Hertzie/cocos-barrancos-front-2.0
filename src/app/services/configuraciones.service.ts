import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable()
export default class ConfiguracionesService{
    constructor(){}

    getTipoServicio(){
        return axios.get('http://localhost:3000/tipo_servicio').then(resp => resp.data);
    }

    getMesas(){
        return axios.get('http://localhost:3000/mesas').then(resp => resp.data);
    }
}