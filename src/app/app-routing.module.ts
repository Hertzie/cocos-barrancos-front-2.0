import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'producto-editar',
    loadChildren: () => import('./producto-editar/producto-editar.module').then( m => m.ProductoEditarPageModule)
  },
  {
    path: 'empleados',
    loadChildren: () => import('./empleados/empleados.module').then( m => m.EmpleadosPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then( m => m.RolesPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'cuentas',
    loadChildren: () => import('./cuentas/cuentas.module').then( m => m.CuentasPageModule)
  },
  {
    path: 'nuevo-empleado',
    loadChildren: () => import('./nuevo-empleado/nuevo-empleado.module').then( m => m.NuevoEmpleadoPageModule)
  },
  {
    path: 'nuevo-pedido',
    loadChildren: () => import('./nuevo-pedido/nuevo-pedido.module').then( m => m.NuevoPedidoPageModule)
  },
  {
    path: 'pedido-detalle',
    loadChildren: () => import('./pedido-detalle/pedido-detalle.module').then( m => m.PedidoDetallePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
