import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';
import { ViajesService } from 'src/app/services/firestore/viajes/viajes.service';
import { UsuarioStorageService } from 'src/app/services/storage/usuario-storage.service';

@Component({
  selector: 'app-confirmar-viaje',
  templateUrl: './confirmar-viaje.page.html',
  styleUrls: ['./confirmar-viaje.page.scss'],
})
export class ConfirmarViajePage implements OnInit {

  usuario:Usuario={
    email:"",
    password:"",
    nombre:"",
  }

  conductor:Usuario={
    email:"",
    password:"",
    nombre:"",
  }

  viaje:Viaje={
    fecha_viaje:"",
    hora_salida:"",
    destino:"",
    conductor:this.conductor,
    costo:0
  }

  bandera = false

  constructor(private router:Router, private storage:UsuarioStorageService, private storeViaje:ViajesService) { 
    let datos = this.router.getCurrentNavigation()?.extras.state
    if(datos!==undefined){
      let data = datos["datos"]
      this.viaje = data
    }

    this.storage.getSesion().then((sesion)=>{
      if(sesion!=undefined)
      {
          this.usuario=sesion
          this.bandera=false
          
      }
      
      })
  }

  ngOnInit() {
  }

  confirmar(){
    this.viaje.pasajeros=[]
    this.viaje.pasajeros.push(this.usuario)
    this.storeViaje.addPasajero(this.viaje).then(()=>{
      this.storage.addViajeLocal(this.viaje)
      this.bandera=false
      this.router.navigate(['/tabs/viajes'])
    })
  }

}
