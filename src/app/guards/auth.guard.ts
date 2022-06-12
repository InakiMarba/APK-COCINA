import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      /*Si estem autenticats i volem entrar a la ruta '/login' hem de ser redirigits a '/home'
      Si no estem autenticats i volem entrar a qualsevol ruta (privada) que no sigui '/login', hem de ser redirigits a '/login'*/
      if(state.url == "/login" && this._authService.isUserAuthenticated()) this._router.navigate(["/home"]);
      else if(state.url != "/login" && !this._authService.isUserAuthenticated()) this._router.navigate(["/login"]);
      return true;
  }
  
}
