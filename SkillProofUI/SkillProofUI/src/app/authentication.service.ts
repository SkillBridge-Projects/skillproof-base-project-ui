import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Login} from './model/login';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {User} from './model/user';
import {Role} from './model/role';
import {UserDetails} from './model/user-details';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService{

  LoggedInUserDetails$ = new BehaviorSubject<UserDetails>(this.getUser(localStorage.getItem('userDetails')));

  constructor(private http: HttpClient, private router : Router) { }

  login(username: string, password: string): Observable<HttpResponse<User>> {
        const ln: Login = { username, password };
        return this.http.post<User>(`${environment.appUrl}login`, ln, { observe: 'response'});
    }

  signup(formWrapper: FormData): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${environment.appUrl}signup`, formWrapper, { observe: 'response'});
  }

  logout() {
      // remove userDetails from local storage to log user out
      this.setLoggedInUser(null);
      this.router.navigate(['/login']).then(() => {
        location.reload(true);
      });
  }

  setLoggedInUser(userDetails: UserDetails){
    this.LoggedInUserDetails$.next(userDetails);
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }

  getLoggedInUser(): Observable<UserDetails>{
    return this.LoggedInUserDetails$.asObservable();
  }


  getUser(str: string): UserDetails{
    if(str != null)
      return JSON.parse(str);
    else
      return null;
  }

}
