import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoViajePage } from './nuevo-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoViajePageRoutingModule {}
