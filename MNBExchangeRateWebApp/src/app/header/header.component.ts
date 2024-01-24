import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authenticationService: AuthenticationService){}
  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  logout(){
    this.authenticationService.logout();
  }
}
