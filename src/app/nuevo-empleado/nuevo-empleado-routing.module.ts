import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoEmpleadoPage } from './nuevo-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoEmpleadoPageRoutingModule {}
