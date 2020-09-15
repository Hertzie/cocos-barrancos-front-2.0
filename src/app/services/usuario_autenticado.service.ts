import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})
export default class UsuarioAutenticado{
    private usuario : any = null;

    asignarUsuario(usuario){
        this.usuario = usuario;
    }

    obtenerUsuario(){
        return this.usuario;
    }
}