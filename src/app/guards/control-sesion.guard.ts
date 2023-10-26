import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ControlSesionGuard implements CanActivate {
  constructor(private storage:Storage) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validarSesion();
  }
  
  async validarSesion()
  {
    let datos = await this.storage.get("sesion")
    if(datos == 1)
    {
      return true
    }
    else{
      return false
    }
  }
}
