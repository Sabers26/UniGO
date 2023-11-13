import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/firestore/usuario/usuario.service';
import { UsuarioStorageService } from 'src/app/services/storage/usuario-storage.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  usuario: Usuario = {
    email: "",
    password: "",
    nombre: "",
  }
  form: FormGroup

  bandera = false
  nombre_nuevo:string=""
  constructor
    (
      private router: Router,
      private formBuilder: FormBuilder,
      private toastController: ToastController,
      private storage:UsuarioStorageService,
      private store:UsuarioService
    ) {
    this.form = this.formBuilder.group({
      password:["", [Validators.minLength(6)]]
    });
    this.storage.getSesion().then((datos)=>{
      if(datos!==undefined)
      {
        this.usuario=datos
      }
    })
  }

  ngOnInit() {
  }

  mod() {
    if(this.form!==undefined)
    {
      let password=this.form.get("password")?.value;
      if(this.nombre_nuevo!=="")
      {
        this.usuario.nombre=this.nombre_nuevo
      }
      if(this.usuario.password!==password)
      {
        this.usuario.password=password
      }
      this.store.addUsuario(this.usuario).then(()=>{
        this.storage.login(this.usuario)
      })
    }
    
  }

  get errorControl() {
    return this.form?.controls;
  }

  async presentToast(mensaje: string) {
    let toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: "top"
    })

    await toast.present()
  }

  // confimacion

  actionSheetButtons = [
    {
      text: 'Confirmar',
      data: {
        action: this,

      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

}
