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
        canActivate:[ConexionGuardGuard]
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule),
        canActivate:[ConexionGuardGuard]
      },
      {
        path: 'viajes',
        loadChildren: () => import('../viajes/viajes.module').then( m => m.ViajesPageModule),
        canActivate:[NoConexionGuardGuard]
      },
      {
        path: 'nuevo-auto',
        loadChildren: () => import('../nuevo-auto/nuevo-auto.module').then( m => m.NuevoAutoPageModule),
        canActivate:[ConexionGuardGuard]
      },
      {
        path: 'nuevo-viaje',
        loadChildren: () => import('../nuevo-viaje/nuevo-viaje.module').then( m => m.NuevoViajePageModule),
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
