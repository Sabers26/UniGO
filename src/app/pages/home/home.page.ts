import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auto } from 'src/app/interfaces/auto';
import { Sesion } from 'src/app/interfaces/sesion';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';
import { AutenticacionStorageService } from 'src/app/services/autenticacion-storage.service';
import { ViajeServicioService } from 'src/app/services/viajes/viaje-servicio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario:Usuario={
    email:"",
    password:"",
    perfil:{nombre:""},
    patente:""
  }
  auto:Auto={
    
    patente:"",
    color:"",
    modelo:"",
    capacidad:0,
    conductor:""
  }
  viaje:Viaje={
    direccion:'',
    costo:0,
    conductor:this.usuario,
    auto:this.auto,
    pasajeros:[],
    estado:false
  }
  sesion:Sesion={
    id:0,
    usr:this.usuario,
    aut:this.auto,
    viaje:this.viaje
  }
  viajes:Viaje[]=[]
  constructor(private router:Router, private authStorage:AutenticacionStorageService, private viajeFire:ViajeServicioService) {
    this.authStorage.getSesion().then(item=>{
      this.sesion.id=item.id
      this.sesion.usr=item.usr
    })
    this.viajeFire.getAllViajes().then(item=>{
      if(item!==undefined)
      {
        console.log(item)
        this.viajes=item
      }
    })
  }
  pedir(conductor:Usuario){
    this.viajeFire.aggPasajero(this.sesion.usr, conductor).then(item=>{
      if(item)
      {
        this.router.navigate(['/tabs/viajes'])
      }
    })
  }
}
