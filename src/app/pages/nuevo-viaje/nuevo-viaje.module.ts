import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoViajePageRoutingModule } from './nuevo-viaje-routing.module';

import { NuevoViajePage } from './nuevo-viaje.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoViajePageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [NuevoViajePage]
})
export class NuevoViajePageModule {}
