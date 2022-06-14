import { Component, OnInit } from '@angular/core';
import { Notificacion } from '../modelos/notificacion';
import { AuthService } from '../service/auth.service';
import { ComandasService } from '../service/comandas.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  constructor(private _comandos:ComandasService,   private _authService: AuthService) {
    let idRes=localStorage.getItem("idRes");
    this._comandos.notifi(idRes);
  }


  logout(){
    this._authService.logout();
  }
  ngOnInit() {
  }
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }
  get listaNoti():Notificacion[]{
    return this._comandos.listaNoti;
  }

}
