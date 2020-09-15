import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {
  }
  private prodUrl = 'http://localhost:5000'
  private localUrl = 'http://localhost:57266'
  private headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  getUserByEmail(email: string): Observable<User> {
     return this.http.get<User>(`${this.localUrl}/api/users/getbyemail?email=${email}`);
  }

  createNewUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.localUrl}/api/users/createnewuser`, user, {headers: this.headers})
    .pipe(map(response => response));
  }
}
