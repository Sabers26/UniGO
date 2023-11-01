import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoConexionPageRoutingModule } from './no-conexion-routing.module';

import { NoConexionPage } from './no-conexion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoConexionPageRoutingModule
  ],
  declarations: [NoConexionPage]
})
export class NoConexionPageModule {}
