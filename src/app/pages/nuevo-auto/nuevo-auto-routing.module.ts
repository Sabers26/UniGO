import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoAutoPage } from './nuevo-auto.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoAutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoAutoPageRoutingModule {}
