import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MisdatosService {
  public _apodo: string;
  public _nombre: string;
  public _apellido1: string;
  public _apellido2: string;
  public _correo: string;
  public _telefono: string;
  public _contra: string;
  public _contraN: string;

  constructor(private _http: HttpClient, private _authService: AuthService) { }
  private BASE_URL: string = "http://localhost/api";

  async updateuser(apodo: string, nombre: string, apellido1: string, apellido2: string, correo: string, telefono: string, contra: string, contraN: string): Promise<boolean> {
    this._apodo = apodo;
    this._nombre = nombre;
    this._apellido1 = apellido1;
    this._apellido2 = apellido2;
    this._correo = correo;
    this._telefono = telefono;
    this._contra = contra;
    this._contraN = contraN;

    /*La crida necessita els headers, en aquest cas, el 'Content-Type'.
    També s'hi pot afegir el header 'Accept'*/
    const options: any = {
      headers: new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this._authService.token)
    };


    //Com que és una crida de tipus POST, cal generar les dades a enviar en format JSON
    const data: any = {
        'apodo':  this._apodo,
        'nombre':  this._nombre,
        'apellido1':  this._apellido1,
        'apellido2':  this._apellido2,
        'correo':  this._correo,
        'telefono': this._telefono,
        'contra':  this._contra,
        'contraN':  this._contraN
    };


  

    return new Promise(
        (resolve, reject) => {
            this._http.post(this.BASE_URL + "/modificaruser", data, options).subscribe(
                (response: any) => {
                  console.log(response);

                    if(response.status == 200) {
                        //Si tot va bé, emmagatzemem el TOKEN al LS
                        this._authService.token = response.refreshToken;
                        resolve(true);
                    }
                    else{
                      this._authService.token = response.refreshToken;
                      resolve(false);
                    } 
                },
                (error: any) => {
                    console.log(error);
                    reject("Error");
                }
            );
        }
    );
}

}
