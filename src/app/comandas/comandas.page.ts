import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Pedido } from '../modelos/pedido';
import { AuthService } from '../service/auth.service';
import { ComandasService } from '../service/comandas.service';

@Component({
  selector: 'app-comandas',
  templateUrl: './comandas.page.html',
  styleUrls: ['./comandas.page.scss'],
})
export class ComandasPage implements OnInit {

  rol=localStorage.getItem("idRol");

  constructor(private _authService:AuthService, private _comandos:ComandasService, private router: Router) {

      this.router.events.subscribe(
        (event: RouterEvent) => {
            if(event instanceof NavigationEnd && this.router.url=="/comandas") {
              let idRes=localStorage.getItem("idRes");
              console.log(idRes);
              if(this.rol=="7"){
                this._comandos.pedidosRes(idRes);
              }else if(this.rol=="8"){
                this._comandos.pedidosResCam(idRes);
              }
            }
        }
    );
   }
   logout(){
    this._authService.logout();
  }
  ngOnInit() {
  }
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }
  get listaPedidos():Pedido[]{
    return this._comandos.listaPedidos;
  }

  canvioSegui(codCom,estado):void{
    this._comandos.cambiarEstadoPedi(codCom,estado);
    // this.router.navigate(['/comandas']);
    let idRes=localStorage.getItem("idRes");
    console.log(idRes);
    if(this.rol=="7"){
      this._comandos.pedidosRes(idRes);
    }else if(this.rol=="8"){
      this._comandos.pedidosResCam(idRes);
    }
  }
}
