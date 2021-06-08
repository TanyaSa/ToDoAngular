import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './modules/auth/services/auth.service';
import { fadeInAnimation } from './modules/route-animations';

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInAnimation],
})

export class AppComponent {
  title = 'ToDo List';

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, public router: Router) { }

  signOut(): any {
    this.authService.logout();
  }

  getState(outlet): void {
    // Changing the activatedRouteData.state triggers the animation
    console.log(this.router.url);

    return outlet.activatedRouteData.state;
  }

  prepareRoute(outlet: RouterOutlet): void {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  // test(): void {
  //   // alert('hello world!!!');
  //   this.auth.login('tanya1@mail.com', '12345678').subscribe(e => {
  //     this.auth.saveToStorage(e);
  //     console.log('login', e);
  //   });
  // }
}
