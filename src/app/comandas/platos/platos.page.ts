import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platos } from 'src/app/modelos/platos';
import { ComandasService } from 'src/app/service/comandas.service';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.page.html',
  styleUrls: ['./platos.page.scss'],
})
export class PlatosPage implements OnInit {

  codCom;
  rol=localStorage.getItem("idRol");

  constructor(private _comandos:ComandasService, private router: Router,private _activatedRoute: ActivatedRoute) { 
    let routa = this._activatedRoute.snapshot.params;
    this.codCom = routa.codCom;

    this._comandos.platoPedidos(this.codCom);
  }

  ngOnInit() {
  }

  get listaPlatos():Platos[]{
    return this._comandos.listaPlatos;
  }

  canvioEstado(idPlato,estado):void{
    this._comandos.cambiarEstadoPlato(this.codCom,idPlato,estado);
    this.router.navigate(['/platos',this.codCom]);
  }
}
