import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoEditarPageRoutingModule } from './producto-editar-routing.module';

import { ProductoEditarPage } from './producto-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoEditarPageRoutingModule
  ],
  declarations: [ProductoEditarPage]
})
export class ProductoEditarPageModule {}
