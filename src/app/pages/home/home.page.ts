import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router) {
    
  }
<<<<<<< HEAD
  pedir(){
    
=======
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
>>>>>>> 0ebebce3c14779c049bf99e84cde962b808c10c1
  }
}
