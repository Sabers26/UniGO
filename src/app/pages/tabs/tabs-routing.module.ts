import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { ConexionGuard } from 'src/app/guards/conexion.guard';
import { NoConexionGuard } from 'src/app/guards/no-conexion.guard';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),
        canActivate:[ConexionGuard]
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule),
        canActivate:[ConexionGuard]
      },
      {
        path: 'viajes',
        loadChildren: () => import('../viajes/viajes.module').then( m => m.ViajesPageModule),
        canActivate:[NoConexionGuard]
      },
      {
        path: 'nuevo-auto',
        loadChildren: () => import('../nuevo-auto/nuevo-auto.module').then( m => m.NuevoAutoPageModule),
        canActivate:[ConexionGuard]
      },
      {
        path: 'nuevo-viaje',
        loadChildren: () => import('../nuevo-viaje/nuevo-viaje.module').then( m => m.NuevoViajePageModule),
        canActivate:[ConexionGuard]
      },
      {
        path: 'modificar',
        loadChildren: () => import('../modificar/modificar.module').then( m => m.ModificarPageModule),
        canActivate:[ConexionGuard]
      },
      {
        path: 'confirmar-viaje',
        loadChildren: () => import('../confirmar-viaje/confirmar-viaje.module').then( m => m.ConfirmarViajePageModule),
        canActivate:[ConexionGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
