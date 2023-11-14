import { Component } from '@angular/core';

import { Usuario } from './interfaces/usuario';

import { Router } from '@angular/router';
import { UsuarioService } from './services/firestore/usuario/usuario.service';
import { Storage } from '@ionic/storage-angular';
import { ViajesService } from './services/firestore/viajes/viajes.service';
import { UsuarioStorageService } from './services/storage/usuario-storage.service';

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
