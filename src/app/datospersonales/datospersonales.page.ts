import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MisdatosService } from '../service/misdatos.service';

@Component({
  selector: 'app-datospersonales',
  templateUrl: './datospersonales.page.html',
  styleUrls: ['./datospersonales.page.scss'],
})
export class DatospersonalesPage implements OnInit {

  public apodo: string;
  public nombre: string;
  public apellido1: string;
  public apellido2: string;
  public correo: string;
  public telefono: string;
  public contra: string;
  public contraN: string;

  constructor(private _authService: AuthService,  private _misdatosService: MisdatosService, private _router: Router) { }
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }
  ngOnInit() {
  }

    async updateuser(): Promise<void> {
      /*L'estructura try/catch ens permet gestionar qualsevol error de xarxa en la
      comunicació amb el servidor*/
      try {
          const response = await this._misdatosService.updateuser(this.apodo, this.nombre, this.apellido1, this.apellido2, this.correo, this.telefono, this.contra, this.contraN);
          //console.log(response.);
          if(response) {
              this._router.navigate(["/home"]);
          }
      } catch(error) {
          console.log(error);
      }
    }

    get misdatos():any[]{
      console.log(this._misdatosService.datospersonales);
      return this._misdatosService.datospersonales;
    }
}
