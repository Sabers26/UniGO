import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auto } from 'src/app/interfaces/auto';
import { Sesion } from 'src/app/interfaces/sesion';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';
import { AutenticacionStorageService } from 'src/app/services/autenticacion-storage.service';
import { ViajeServicioService } from 'src/app/services/viajes/viaje-servicio.service';

@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.page.html',
  styleUrls: ['./nuevo-viaje.page.scss'],
})
export class NuevoViajePage implements OnInit {
  form:FormGroup;

  usuario:Usuario={
    perfil:{nombre:""},
    email:'',
    password:'',
    patente:''
  }

  auto:Auto={
    patente:'',
    modelo:'',
    color:'',
    capacidad:0,
    conductor:''
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
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private authStorage:AutenticacionStorageService,
    private viajeFire:ViajeServicioService
  ) 
  { 
    this.form = this.formBuilder.group({
      direccion: ['', [Validators.required]],
      costo: ['', [Validators.required]],
    });
    this.authStorage.getSesion().then(item=>{
      this.usuario=item.usr
      this.auto=item.aut
      this.viaje.auto=this.auto
      this.viaje.conductor=item.viaje.conductor
      this.viaje.pasajeros=item.viaje.pasajeros
    })
  }

  ngOnInit() {
  }

  get errorControl(){
    return this.form?.controls;
  }

  async agregar(){
    this.viaje.direccion = this.form.get('direccion')?.value;
    this.viaje.costo = this.form.get('costo')?.value;
    this.viaje.estado=true
    this.viaje.conductor=this.usuario
    this.viajeFire.addViaje(this.viaje)
    this.authStorage.iniciarSesion(this.sesion.id,this.usuario,this.auto,this.viaje)
    this.router.navigate(['/tabs/viajes'])
  }

}
