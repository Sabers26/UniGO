import { Sesion } from 'src/app/interfaces/sesion';
import { Auto } from './../../interfaces/auto';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AutenticacionStorageService } from 'src/app/services/autenticacion-storage.service';
import { AutoServicioService } from 'src/app/services/auto-servicio.service';
import { Router } from '@angular/router';


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
  sesion:Sesion={
    id:0,
    usr:this.usuario,
    aut:this.auto
  }
  idAuto:any=''
  constructor(private authStorage:AutenticacionStorageService, private autoFire:AutoServicioService, private router:Router) {
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

  }
}
