import { Component, OnInit } from '@angular/core';
import { Notificacion } from '../modelos/notificacion';
import { ComandasService } from '../service/comandas.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  constructor(private _comandos:ComandasService) {
    let idRes=localStorage.getItem("idRes");
    this._comandos.notifi(idRes);
  }

  ngOnInit() {
  }

  get listaNoti():Notificacion[]{
    return this._comandos.listaNoti;
  }

}
