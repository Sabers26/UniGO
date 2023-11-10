import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioStorageService } from 'src/app/services/storage/usuario-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario:Usuario={
    email:"",
    nombre:"",
    password:""
  }
  bandera = true
  constructor(private router:Router, private storage:UsuarioStorageService) {
    this.storage.getSesion().then((sesion)=>{
      if(sesion!=undefined)
    {
        this.usuario=sesion
        this.bandera=false
    }
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
  pedir(){
  }
}
