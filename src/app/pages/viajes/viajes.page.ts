import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';
import { ViajesService } from 'src/app/services/firestore/viajes/viajes.service';
import { UsuarioStorageService } from 'src/app/services/storage/usuario-storage.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  bandera:boolean=false
  bandera_viaje:number=0

  conductor:Usuario={
    email:"",
    password:"",
    nombre:"",
  }
  usuario:Usuario={
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
  constructor(
    private router:Router, 
    private storage:UsuarioStorageService, 
    private toastController:ToastController, 
    private store:ViajesService,
    ) { }

  ngOnInit() {
    
  }
  ionViewDidEnter(){
    this.bandera=true
    this.storage.getSesion().then((sesion)=>{
      this.usuario=sesion
      this.storage.getViajeLocal().then((viaje)=>{
        if(viaje!==null)
        {
          console.log(viaje)
          this.viaje=viaje
          if(this.viaje.conductor.email===this.usuario.email)
          {
            this.bandera_viaje=1
          }
          else{
            this.bandera_viaje=2
          }
        }
      })
    })
  }

  agregar(){
    if(this.usuario.auto!==undefined)
    {
      this.router.navigate(['/tabs/nuevo-viaje'])
    }
    else
    {
      this.presentToast("Debe agregar un auto para poder agregar un viaje")
    }
  }

  async presentToast(mensaje:string)
  {
    let toast = await this.toastController.create({
      message:mensaje,
      duration:1500,
      position:"top"
    })

    await toast.present()
  }

  async anular(){
    await this.store.anularViaje(this.viaje).then((result)=>{
      this.storage.anularViaje().then(()=>{
        this.router.navigate(['/tabs/home'])
      })
    })
  }

  async cancelar(){
    await this.store.eliminarPasajero(this.viaje).then((result)=>{
      console.log(result)
    })
  }


  
}
