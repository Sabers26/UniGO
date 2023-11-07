import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auto } from 'src/app/interfaces/auto';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';
import { AutenticacionStorageService } from 'src/app/services/autenticacion-storage.service';
import { AutoServicioService } from 'src/app/services/auto-servicio.service';

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
    pasajeros:[]
  }

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private authStorage:AutenticacionStorageService,
    private autoFire:AutoServicioService
  ) 
  { 
    this.form = this.formBuilder.group({
      direccion: ['', [Validators.required]],
      costo: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  get errorControl(){
    return this.form?.controls;
  }

  async agregar(){
    this.viaje.direccion = this.form.get('direccion')?.value;
    this.viaje.costo = this.form.get('costo')?.value;

  }

}
