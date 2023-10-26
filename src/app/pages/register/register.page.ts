import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuario:Usuario={
    nombre:"",
    email:"",
    password:""
  }
  constructor(private storage:Storage, private router:Router) { }

  ngOnInit() {
  }

  async onSubmit()
  {
    console.log("hola")
    await this.storage.set(this.usuario.email, this.usuario);

    this.router.navigate(['tabs/login']);
  }
}
