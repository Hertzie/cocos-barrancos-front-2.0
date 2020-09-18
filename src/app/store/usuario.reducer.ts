import { createReducer, on } from '@ngrx/store';
import {set_usuario, get_usuario, logout_usuario} from './usuario.actions';

export const usuarioInicial = null;

const _usuarioReducer = createReducer(
    usuarioInicial,
    on(set_usuario, (state, payload) => state = payload ),
    on(get_usuario, (state) => state),
    on(logout_usuario, (state) => null)
);