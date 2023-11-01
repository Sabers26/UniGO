import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { ConexionGuardGuard } from 'src/app/guards/conexion-guard.guard';
import { NoConexionGuardGuard } from 'src/app/guards/no-conexion-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),
        canActivate:[NoConexionGuardGuard]
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule),
      },
      {
        path: 'viajes',
        loadChildren: () => import('../viajes/viajes.module').then( m => m.ViajesPageModule),
        canActivate:[ConexionGuardGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
