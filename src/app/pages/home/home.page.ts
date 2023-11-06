import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auto } from 'src/app/interfaces/auto';
import { Sesion } from 'src/app/interfaces/sesion';
import { Usuario } from 'src/app/interfaces/usuario';
import { AutenticacionStorageService } from 'src/app/services/autenticacion-storage.service';

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
  sesion:Sesion={
    id:0,
    usr:this.usuario,
    aut:this.auto
  }
  constructor(private router:Router, private authStorage:AutenticacionStorageService) {
    this.authStorage.getSesion().then(item=>{
      this.sesion.id=item.id
      this.sesion.usr=item.usr
    })
  }
  pedir(){
    this.router.navigate(['/tabs/viajes'])
  }
}
