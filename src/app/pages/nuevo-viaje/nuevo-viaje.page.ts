import { Viaje } from './../../interfaces/viaje';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { ViajesService } from 'src/app/services/firestore/viajes/viajes.service';
import { UsuarioStorageService } from 'src/app/services/storage/usuario-storage.service';

@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.page.html',
  styleUrls: ['./nuevo-viaje.page.scss'],
})
export class NuevoViajePage implements OnInit {

  

  form:FormGroup;
  bandera = false
  fecha_sistema=new Date()
  fecha_sistema_str= this.fecha_sistema.getUTCDate() + "/" + (this.fecha_sistema.getUTCMonth()+1) + "/"+this.fecha_sistema.getUTCFullYear()
  
  hora_sistema:number = this.fecha_sistema.getHours()
  listaHoras:number[]=[]
  usuario:Usuario={
    email:"",
    password:"",
    nombre:"",
  }
  hora_base = this.fecha_sistema.getHours()+1+":00"

  viaje:Viaje={
    fecha_viaje:this.fecha_sistema_str,
    hora_salida:this.hora_base,
    destino:"",
    conductor:this.usuario,
    costo:0
  }
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private storeViaje:ViajesService,
    private storage:UsuarioStorageService
  ) 
  { 
    this.form = this.formBuilder.group({
      direccion: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      comentarios:[""]
    });
    this.cargarHoras()
  }

  ngOnInit() {
  }

  cargarHoras()
  {
    for (let index = 1; index < 24; index++) {
      if(this.hora_sistema+index>24)
      {
        break
      }
      this.listaHoras.push(this.hora_sistema+index)
    }
    console.log(this.listaHoras)
  }

  get errorControl(){
    return this.form?.controls;
  }

  async agregar(){
    this.bandera=true
    this.viaje.destino=this.form.get("direccion")?.value;
    this.viaje.comentarios=this.form.get("comentarios")?.value;
    this.viaje.costo=this.form.get("costo")?.value;
    this.storage.getSesion().then((datosUsuario)=>{
      this.viaje.conductor=datosUsuario
      this.storeViaje.addViaje(this.viaje).then(()=>{
        console.log("Pase el add viaje del store")
        this.storage.addViajeLocal(this.viaje)
        console.log("pase el viaje del storage")
        this.bandera=false
        this.router.navigate(['/tabs/viajes'])
      })
    }) 
    
  }

}
