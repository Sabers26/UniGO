import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoAutoPageRoutingModule } from './nuevo-auto-routing.module';

import { NuevoAutoPage } from './nuevo-auto.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoAutoPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [NuevoAutoPage]
})
export class NuevoAutoPageModule {}
