import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionStorageService } from '../services/autenticacion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NoConexionGuardGuard implements CanActivate {
  constructor(private authStorage:AutenticacionStorageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
  async getSesion()
  {
    if(await this.authStorage.getSesion() > 0)
    {
      return true
    }
    return false
  }
}
