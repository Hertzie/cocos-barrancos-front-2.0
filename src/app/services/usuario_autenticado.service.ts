import { Injectable } from "@angular/core";

@Injectable()
export default class UsuarioAutenticado{
    private usuario : any = null;
    private paginas : any[] = [];

    constructor(){}

    asignarUsuario(usuario){
        this.usuario = usuario;
    }

    obtenerUsuario(){
        return this.usuario;
    }

    eliminarUsuario(){
        this.usuario = null;
    }

    asignarPaginas(paginas){
        this.paginas = paginas;
    }

    obtenerPaginas(){
        return this.paginas;
    }
}