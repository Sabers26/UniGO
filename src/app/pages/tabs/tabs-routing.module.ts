import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule),
      },
      {
        path: 'viajes',
        loadChildren: () => import('../viajes/viajes.module').then( m => m.ViajesPageModule),
      },
      {
        path: 'nuevo-auto',
        loadChildren: () => import('../nuevo-auto/nuevo-auto.module').then( m => m.NuevoAutoPageModule),
      },
      {
        path: 'nuevo-viaje',
        loadChildren: () => import('../nuevo-viaje/nuevo-viaje.module').then( m => m.NuevoViajePageModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
