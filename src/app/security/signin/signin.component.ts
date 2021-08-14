import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLogin } from '../../models/user-login.model'
import { AuthenticateService } from '../services/authenticate.service';
import {Router} from "@angular/router";
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {


  constructor(private _authenticateService : AuthenticateService,  private router: Router) { }

  
  ngOnInit(): void {
    
  }

  userLogin: UserLogin = new UserLogin();
  authenticatedUser: null;
  errorMessage: string= null;
  signin(f: NgForm){
    this.userLogin.username = f.value.username;
    this.userLogin.password = f.value.password;
    //API call
    this._authenticateService.signin(this.userLogin).subscribe(
        res => {
          //this.setAuthUser(res);
          localStorage.setItem('username', res.username);
          localStorage.setItem('userID', res._id);
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('companyID', res.companyID);
          this.router.navigate(['/']);
        },
        err => {this.errorMessage = err.error.message;}
    );
      
  }

  //voorlopig niet gebruikt
  setAuthUser(data){
    this._authenticateService.findAuthUser(data.id).subscribe(res=>{
      this._authenticateService.setAuthUser(res);
    },
    err=>{
      this.errorMessage = "Fout bij het laden van auth user"
    }
    )
  }



}
