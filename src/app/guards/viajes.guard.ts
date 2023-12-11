import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioStorageService } from '../services/storage/usuario-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ViajesGuard implements CanActivate {
  constructor(private storage:UsuarioStorageService)
  {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getAcceso();
  }
  async getAcceso()
  {
    let bandera:boolean=false
    await this.storage.getViajeLocal().then((viaje)=>{
      if(viaje===null)
      {
        bandera=true
      }
    })
    return bandera
  }
}
