import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    //Atributs que ha d'emmagatzemar: URL base i credencials
    private BASE_URL: string = "http://localhost/api";
    private _email: string = null;
    private _password: string = null;
    router: any;

    //Injecció del servei HttpClient per poder fer les peticions al WebService
    constructor(private _http: HttpClient, private _router: Router) {}

    /*La funció de login serà async perquè, en el moment d'iniciar sessió,
    voldrem esperar-ne el resultat abans d'accedir a la part privada del client.*/
    async login(email: string, password: string): Promise<boolean> {
        this._email = email;
        this._password = password;

        /*La crida necessita els headers, en aquest cas, el 'Content-Type'.
        També s'hi pot afegir el header 'Accept'*/
        let options: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }

        //Com que és una crida de tipus POST, cal generar les dades a enviar en format JSON
        const data: any = {
            'email':  this._email,
            'password':  this._password
        }

        //Realització de la crida, embolcallada en una Promise (per poder fer l'await)
        return new Promise(
            (resolve, reject) => {
                //Una crida POST ha de rebre l'URL, les dades i les opcions (capçaleres)
                this._http.post(this.BASE_URL + "/login", data, options).subscribe(
                    (response: any) => {
                        if(response.data.idRol==7 || response.data.idRol==8){   
                                if(response.status == 200) {
                                    console.log(response);
                                    //Si tot va bé, emmagatzemem el TOKEN al LS
                                    localStorage.setItem("TOKEN", response.token);
                                    localStorage.setItem("idUser", response.data.uid);
                                    localStorage.setItem("idRes", response.data.idRes);
                                    localStorage.setItem("idRol", response.data.idRol);
                                    
                                    resolve(true);
                                }
                                else resolve(false);
                        }else{
                            this.router.navigate(['/home']);
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


    /*Utilitzarem aquesta funció per reinicar la sessió quan el token hagi expirat.
    Cal tenir en compte que, per poder-la executar, ens cal assegurar que el service tingui
    les dades de les credencials de l'usuari*/
    async restartSession(): Promise<boolean> {
        if(this._email != null && this._password != null) {
            const logResult = await this.login(this._email, this._password);
            if(logResult) return true;
        }
        return false;
    }

    //Per tancar la sessió només cal esborrar credencials i el TOKEN
    logout(): void {
        localStorage.removeItem("idUser");
        localStorage.removeItem("idRes");
        localStorage.removeItem("idRol");
        localStorage.removeItem("TOKEN");
        this._router.navigate(['/login']);
    }

    get token(): string {
        return localStorage.getItem("TOKEN");
    }

    set token(token: string) {
        // console.log(token);
        localStorage.setItem("TOKEN", token);
    }

    /*Per ajudar-vos durant el desenvolupament i per tal que pugueu ser més àgils programant,
    podeu comentar la comprovació de les credencials. En el codi final, aquesta comprovació 
    hi ha de ser*/
    isUserAuthenticated(): boolean {
        return localStorage.getItem("TOKEN") != null;
    }

}
