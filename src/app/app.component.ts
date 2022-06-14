import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  private _cathegoriesIsOpen: boolean = false;
  constructor( private _authService: AuthService) {}
    ngOnInit():void{
    if(this.isdark()){
      document.body.setAttribute('color-theme', "dark");
    }else{
      console.log("asd");
      document.body.removeAttribute('color-theme');
    }
  }
  isdark(): string{
    return localStorage.getItem("BG");
  }
  openCathegories(): void {
    this._cathegoriesIsOpen = !this._cathegoriesIsOpen;
  }
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }

  isCathegoriesOpen(): boolean {
    return this._cathegoriesIsOpen;
  }
  
    setDarkMode(event):void{
      if(event.detail.checked){
        document.body.setAttribute('color-theme', "dark");
        localStorage.setItem("BG","true");
      }else{
        document.body.removeAttribute('color-theme');
        localStorage.setItem("BG","false");
      }
    }
}
