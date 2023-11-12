import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';
import { ViajesService } from 'src/app/services/firestore/viajes/viajes.service';
import { UsuarioStorageService } from 'src/app/services/storage/usuario-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  viajes:Viaje[]=[]
  loaded = false;

  usuario:Usuario={
    email:"",
    nombre:"",
    password:""
  }
  bandera = true
  constructor(private router:Router, private storage:UsuarioStorageService, private storeViaje:ViajesService) {
    this.storage.getSesion().then((sesion)=>{
    if(sesion!=undefined)
    {
        this.usuario=sesion
        this.bandera=false
        
    }
    this.storeViaje.getAllViajes().then((viajes)=>{
      
      this.viajes=viajes
      this.loaded = true;
    })
    })
  }
  ionViewDidEnter(){
    this.bandera=true
    this.storage.getSesion().then((sesion)=>{
      if(sesion!=undefined)
    {
        this.usuario=sesion
        this.bandera=false
    }
    })
  }
  pedir(viaje:Viaje){
    let datos:NavigationExtras={
      state:{
          datos:viaje
        }
    }
    
    this.router.navigate(["/tabs/confirmar-viaje"], datos)
  }


}
