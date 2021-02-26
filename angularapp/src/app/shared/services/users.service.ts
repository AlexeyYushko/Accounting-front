import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from "rxjs";
import { BaseHttpClient } from '../core/base-httpclient';

@Injectable()
export class UsersService extends BaseHttpClient {

  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
     return this.get<User>(`/api/users?email=${email}`);
  }

  add(user: User): Observable<User> {
    return this.post<User>(`/api/users/add`, user);
  }
}
