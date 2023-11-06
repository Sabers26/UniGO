import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionStorageService } from '../services/autenticacion-storage.service';
import { Usuario } from '../interfaces/usuario';
import { Sesion } from '../interfaces/sesion';
import { Auto } from '../interfaces/auto';

@Injectable({
  providedIn: 'root'
})
export class NoConexionGuardGuard implements CanActivate {
  usuario:Usuario={
    email:"",
    password:"",
    perfil:{nombre:""},
    patente:""
  }
  auto:Auto={
    patente:'',
    modelo:'',
    color:'',
    capacidad:0,
    conductor:''
  }
  sesion:Sesion={
    id:0,
    usr:this.usuario,
    aut:this.auto
  }
  constructor(private authStorage:AutenticacionStorageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
  async getSesion()
  {
    this.authStorage.getSesion().then(item=>{
      if(item==undefined)
      {
        return false
      }
      else
      {
        this.sesion.id=item.id
        this.sesion.usr=item.usr
        return true
      }
      
    })
  }
}
