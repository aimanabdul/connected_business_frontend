import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLogin } from '../../models/user-login.model'
import { AuthenticateService } from '../services/authenticate.service';
import {Router} from "@angular/router";
import { UserService } from 'src/app/user/services/user.service';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {


  constructor(
    private _authenticateService : AuthenticateService,  
    private router: Router,
    private _userService: UserService,
  
    ) { }

  
  ngOnInit(): void {
    
  }

  userLogin: UserLogin = new UserLogin();
  authenticatedUser: null;
  errorMessage: string= null;
  authorities: Role[];
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
          this.authorities = res.roles;
          //console.log(this.authorities)
          // find user and set company id in localstorage
          this.findUser(res._id)
          
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

  user = {} as User;
  findUser(id: string){
    this._userService.findUserById(id).subscribe(res => {
      this.user = res
      console.log(res)
      //set companyID in localStorage
      if(res.companyID){
        localStorage.setItem('companyID', res.companyID);
      }

      if (res.companyID){
        localStorage.setItem('hasCompany', 'yes');
      }
      // check if superadmin
      // if superadmin set role superadmin in local storage
      for(var i = 0; i < res.roles.length; i ++){
        if(res.roles[i].name == "superadmin"){
          localStorage.setItem('isSuperadmin', 'yes');

        }
      }
    },
    err=>{this.errorMessage = "Fout bij het laden van gegevens van gebruiker"}
    )
  }



}
