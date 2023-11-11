import { Viaje } from './../../interfaces/viaje';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/firestore/usuario/usuario.service';
import { ViajesService } from 'src/app/services/firestore/viajes/viajes.service';
import { UsuarioStorageService } from 'src/app/services/storage/usuario-storage.service';

@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.page.html',
  styleUrls: ['./nuevo-viaje.page.scss'],
})
export class NuevoViajePage implements OnInit {
  form:FormGroup;

  usuario:Usuario={
    email:"",
    password:"",
    nombre:"",
  }
  viaje:Viaje={
    destino:"",
    conductor:this.usuario
  }
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private sotreViajes:ViajesService,
    private storage:UsuarioStorageService
  ) 
  { 
    this.form = this.formBuilder.group({
      direccion: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      comentarios:[""]
    });
  }

  ngOnInit() {
  }

  get errorControl(){
    return this.form?.controls;
  }

  async agregar(){
    this.viaje.destino=this.form.get("direccion")?.value;
    this.viaje.comentarios=this.form.get("comentarios")?.value;
    this.storage.getSesion().then((datosUsuario)=>{
      this.viaje.conductor=datosUsuario
      this.sotreViajes.addViaje(this.viaje).then(()=>{
        this.storage.addViajeLocal(this.viaje)
      })
      this.router.navigate(['/tabs/home'])
    }) 
    
  }

}
