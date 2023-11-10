import { Viaje } from './../../interfaces/viaje';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.page.html',
  styleUrls: ['./nuevo-viaje.page.scss'],
})
export class NuevoViajePage implements OnInit {
  form:FormGroup;

  fecha_viaje:Date = new Date()
  hora_salida!:string;
  
  usuario:Usuario={
    email:"",
    password:"",
    nombre:"",
  }
  viaje:Viaje={
    fecha:this.fecha_viaje,
    salida:"",
    destino:"",
    conductor:this.usuario
  }
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
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
    
  }

}
