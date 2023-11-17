import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(`${environment.appUrl}admin/users`);
  }

}
