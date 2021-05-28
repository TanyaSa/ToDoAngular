import { Component } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ToDo List';

  constructor(private authService: AuthService){}

  signOut(): any{
    this.authService.logout();
  }

  // test(): void {
  //   // alert('hello world!!!');
  //   this.auth.login('tanya1@mail.com', '12345678').subscribe(e => {
  //     this.auth.saveToStorage(e);
  //     console.log('login', e);
  //   });
  // }
}
