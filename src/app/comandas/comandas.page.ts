import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '../modelos/pedido';
import { ComandasService } from '../service/comandas.service';

@Component({
  selector: 'app-comandas',
  templateUrl: './comandas.page.html',
  styleUrls: ['./comandas.page.scss'],
})
export class ComandasPage implements OnInit {

  rol=localStorage.getItem("idRol");

  constructor(private _comandos:ComandasService, private router: Router) {
    let idRes=localStorage.getItem("idRes");

      if(this.rol=="7"){
        this._comandos.pedidosRes(idRes);
      }else if(this.rol=="8"){
        this._comandos.pedidosResCam(idRes);
      }
    
   }

  ngOnInit() {
  }

  get listaPedidos():Pedido[]{
    return this._comandos.listaPedidos;
  }

  canvioSegui(codCom,estado):void{
    this._comandos.cambiarEstadoPedi(codCom,estado);
    this.router.navigate(['/comandas']);
  }
}
