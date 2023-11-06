import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auto } from 'src/app/interfaces/auto';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-nuevo-auto',
  templateUrl: './nuevo-auto.page.html',
  styleUrls: ['./nuevo-auto.page.scss'],
})
export class NuevoAutoPage implements OnInit {
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

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
  ) 
  { 
    this.form = this.formBuilder.group({
      patente: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      color: ['', [Validators.required]],
      capacidad: ['', [Validators.required]],
    });
  }


  ngOnInit() {
  }

  get errorControl(){
    return this.form?.controls;
  }

  async agregar(){
    this.auto.patente = this.form.get('patente')?.value;
    this.auto.modelo = this.form.get('modelo')?.value;
    this.auto.color = this.form.get('color')?.value;
    this.auto.capacidad = this.form.get('capacidad')?.value;
  }

}
