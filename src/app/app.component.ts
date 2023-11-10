import { Component } from '@angular/core';

import { Usuario } from './interfaces/usuario';

import { Router } from '@angular/router';
import { UsuarioService } from './services/firestore/usuario/usuario.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router:Router, private storage:Storage) {}

  async ngOnInit() 
  {
    this.storage.create()
  }

}
