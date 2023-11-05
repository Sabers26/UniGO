import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoConexionPage } from './no-conexion.page';

const routes: Routes = [
  {
    path: '',
    component: NoConexionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoConexionPageRoutingModule {}
