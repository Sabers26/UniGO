
import { Sesion } from 'src/app/interfaces/sesion';
import { Auto } from './../../interfaces/auto';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AutenticacionStorageService } from 'src/app/services/autenticacion-storage.service';
import { AutoServicioService } from 'src/app/services/auto-servicio.service';
import { Router } from '@angular/router';
import { Viaje } from 'src/app/interfaces/viaje';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
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
  idAuto:any=''
  constructor(
    private authStorage:AutenticacionStorageService, 
    private autoFire:AutoServicioService, private router:Router) {
    this.authStorage.getSesion().then(item=>{
      this.sesion.id=item.id
      this.usuario=item.usr
      this.auto=item.aut
    })
  }

  ngOnInit() {
    
  }

  async agregarAuto()
  {
    this.router.navigate(['/tabs/nuevo-auto'])
  }

  modificarDatos()
  {
    
  }

  eliminarAuto()
  {
    this.autoFire.deleteAuto(this.auto).then(item=>{
      if(item)
      {
        this.auto={
    
          patente:"",
          color:"",
          modelo:"",
          capacidad:0,
          conductor:""
        }
        this.authStorage.iniciarSesion(this.sesion.id, this.usuario, this.auto, this.viaje)
      }
    })
  }
}
