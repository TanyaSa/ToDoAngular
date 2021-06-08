import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ListType } from '../../checklist/list/list.type';
import { Tokens } from '../../checklist/list/tokens.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../user';
import jwt_decode from 'jwt-decode';
import { Role } from '../role';
import { Ability, AbilityBuilder } from '@casl/ability';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = '/auth/sign-in';
  registerUrl = '/auth/sign-up';
  checklistUrl = '/rest/checklist';
  refreshUrl = '/auth/refresh';
  signoutUrl = '/auth/sign-out';
  email = 'abc';
  password = '123';
  lists: ListType;

  private currentUser: User;
  private _tokens: Tokens;
  public get token(): string {
    return this._tokens?.accessToken;
  }
  constructor(private http: HttpClient, private router: Router, private ability: Ability, private errorService: MessageService) {
    const accessToken = localStorage.getItem('AuthToken');
    const refreshToken = localStorage.getItem('RefreshToken');
    this._tokens = { accessToken, refreshToken };

    if (accessToken) {
      this.currentUser = this.decodeToken(accessToken);
      this.updateAbility(this.currentUser);
    }
  }

  isSignin(): boolean {
    console.log('isSignin', this.token);
    return !!this.token;
  }

  login(email, password): Observable<boolean> {
    const a = environment.host + this.loginUrl;
    return this.http.post<Tokens>(a, { email, password }, {
      responseType: 'json',
      params: { setAuthToken: 'false' }
    }).pipe(tap(e => {
      localStorage.setItem('AuthToken', e.accessToken);
      localStorage.setItem('RefreshToken', e.refreshToken);
      this.currentUser = this.decodeToken(e.accessToken);
      this.updateAbility(this.currentUser);
      this._tokens = e;
    }), map(e => true)).pipe();
  }

  register(email, password, fullName): Observable<User> {
    const a = environment.host + this.registerUrl;
    return this.http.post<User>(a, { email, password, fullName }, {
      responseType: 'json',
    }).pipe(tap(e => {
      console.log(e);
      this.errorService.showInfo('User ' + fullName + ' created.');
      this.router.navigate(['/signin']);
      return fullName;
    }));
  }

  private updateAbility(user): void {
    const { can, rules } = new AbilityBuilder<Ability>();

    can('update', 'all');

    if (user.role === 'admin') {
      can('remove', 'all');
    } else {
      can('add', 'all');
    }

    this.ability.update(rules);
  }

  decodeToken(jwtAccessToken: string): User {    //
    return jwt_decode(jwtAccessToken);
  }

  get isAdmin(): boolean {    //
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get userRole(): Role {
    return this.currentUser.role;
  }

  updateTokensPair(): Observable<boolean> {
    const a = environment.host + this.refreshUrl;
    return this.http.post<Tokens>(a, { refreshToken: this._tokens.refreshToken }, {
      responseType: 'json'
    }).pipe(tap(newTokensPair => {
      localStorage.setItem('AuthToken', newTokensPair.accessToken);
      localStorage.setItem('RefreshToken', newTokensPair.refreshToken);
      this._tokens = newTokensPair;
    }), map(newTokensPair => true));
  }

  logout(): Observable<any> {
    localStorage.clear();
    this._tokens = null;
    this.currentUser = null;    //
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this._tokens);

    const a = environment.host + this.signoutUrl;

    this.router.navigateByUrl('/signin');

    return this.http.post(a, { responseType: 'json' });
  }
}
