import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoEmpleadoPageRoutingModule } from './nuevo-empleado-routing.module';

import { NuevoEmpleadoPage } from './nuevo-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoEmpleadoPageRoutingModule
  ],
  declarations: [NuevoEmpleadoPage]
})
export class NuevoEmpleadoPageModule {}
