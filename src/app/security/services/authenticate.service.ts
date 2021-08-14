import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, pipe, throwError } from 'rxjs';
import {User} from '../../models/user.model';
import {UserLogin} from '../../models/user-login.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from "rxjs"; 
import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
  })
export class AuthenticateService {

  constructor(private _httpClient: HttpClient) { }


  signin(userLogin: UserLogin): Observable<User> {
    return this._httpClient.post<User>("http://localhost:8080/connectedb/signin", userLogin)
                                      
  }

  signup(user: User): Observable<User>{
    return this._httpClient.post<User>("http://localhost:8080/connectedb/signup", user)
  }

  user = {} as User;
  findAuthUser(id: string){
    return this._httpClient.get<User>("http://localhost:8080/connectedb/users/user/" + id)
  }

  setAuthUser(data: User)
  {
    this.user = data;
  }

  getAuthUser(){
    return this.user;
  }




}
