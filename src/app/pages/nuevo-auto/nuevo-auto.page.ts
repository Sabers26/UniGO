import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auto } from 'src/app/interfaces/auto';
import { Sesion } from 'src/app/interfaces/sesion';
import { Usuario } from 'src/app/interfaces/usuario';
import { AutenticacionStorageService } from 'src/app/services/autenticacion-storage.service';
import { AutoServicioService } from 'src/app/services/auto-servicio.service';

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
  sesion:Sesion={
    id:0,
    usr:this.usuario,
    aut:this.auto
  }

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private authStorage:AutenticacionStorageService,
    private autoFire:AutoServicioService
  ) 
  { 
    this.form = this.formBuilder.group({
      patente: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      color: ['', [Validators.required]],
      capacidad: ['', [Validators.required]],
    });
    this.authStorage.getSesion().then(item=>{
      this.sesion.id=item.id
      this.sesion.usr=item.usr
      this.auto=item.aut
      this.usuario=item.usr
      this.auto.conductor=this.usuario.email
    })
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
    const autoUsuario = await this.autoFire.addAuto(this.auto)

    if(autoUsuario)
    {
      await this.authStorage.iniciarSesion(this.sesion.id, this.usuario,this.auto)
      this.router.navigate(['/tabs/perfil'])
    }
  }

}
