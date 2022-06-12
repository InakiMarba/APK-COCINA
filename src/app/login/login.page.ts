import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string;
  public password: string;
  
  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }
  
  async login(): Promise<void> {
    /*L'estructura try/catch ens permet gestionar qualsevol error de xarxa en la
    comunicació amb el servidor*/
    try {
        const response = await this._authService.login(this.email, this.password);
        //console.log(response.);
        if(response) {
            this._router.navigate(["/home"]);
        }
    } catch(error) {
        console.log("Error!");
    }
}
}
