import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router , NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rewaa';
  showNav : boolean = false;
  
  constructor(public authService: AuthService,private router: Router) { 
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if(this.authService.isLoggedIn() && event['url'] != '/login'){
          this.showNav = true;
        }else{
          this.showNav = false;
        }
      }
    });
  }
}
