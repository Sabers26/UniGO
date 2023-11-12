import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';

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

  constructor
    (
      private router: Router,
      private formBuilder: FormBuilder,
      private toastController: ToastController,
    ) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  mod() {

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

  public actionSheetButtons = [
    {
      text: 'Confirmar',
      data: {
        action: 'Share',

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
