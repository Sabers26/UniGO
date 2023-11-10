import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auto } from 'src/app/interfaces/auto';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/firestore/usuario/usuario.service';
import { UsuarioStorageService } from 'src/app/services/storage/usuario-storage.service';


@Component({
  selector: 'app-nuevo-auto',
  templateUrl: './nuevo-auto.page.html',
  styleUrls: ['./nuevo-auto.page.scss'],
})
export class NuevoAutoPage implements OnInit {
  form:FormGroup;

  bandera=false

  auto:Auto={
    patente:"",
    modelo:"",
    color:"",
    capacidad:0
  }
  usuario:Usuario={
    email:"",
    password:"",
    nombre:"",
  }
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private storage:UsuarioStorageService,
    private store:UsuarioService) 
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
    this.bandera=true
    this.auto.patente=this.form.get("patente")?.value
    this.auto.modelo=this.form.get("modelo")?.value
    this.auto.color=this.form.get("color")?.value
    this.auto.capacidad=this.form.get("capacidad")?.value

    await this.storage.getSesion().then((datosUsuario)=>{
      this.usuario=datosUsuario
      this.usuario.auto=this.auto
      this.storage.login(this.usuario)
      this.store.addAuto(this.usuario)
      this.router.navigate(["/tabs/perfil"])
    })
  }

}
