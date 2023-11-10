import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth-firebase/auth.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  usuario:Usuario={
    email:"",
    password:"",
    nombre:"",
  }

  form:FormGroup;

  bandera = false

  constructor
  (
    private formBuilder: FormBuilder,
    private router:Router,
    private authFire:AuthService
  ) 
  { 
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    this.bandera = true
    this.authFire.recuperar(this.usuario)
  }

}
