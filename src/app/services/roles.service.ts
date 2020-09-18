import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable()
export default class RolesService{
    constructor(){}

    obtenerRoles(){
        return axios.get('http://localhost:3000/roles').then(resp => resp.data);
    }
}