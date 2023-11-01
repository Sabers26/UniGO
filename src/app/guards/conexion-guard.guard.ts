import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionStorageService } from '../services/autenticacion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ConexionGuardGuard implements CanActivate {
  constructor(private authStorage:AutenticacionStorageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getSesion();
  }
  
  async getSesion()
  {
    if(await this.authStorage.getSesion()===2)
    {
      return true
    }
    return false
  }
}
