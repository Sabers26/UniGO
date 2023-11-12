import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmarViajePage } from './confirmar-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmarViajePageRoutingModule {}
