import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {User} from '../../models/user.model';
import { AuthenticateService } from '../services/authenticate.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private _authenticateService : AuthenticateService,  private router: Router) { }

  ngOnInit(): void {

  }
  
  errorMessage: string = null;
  successMessage: string =null;
  user = {} as User;
  onSubmit(f: NgForm){
    //ToDo confirmEmail and confirmPassword
    //if(f.value.email != f.value.confirmPassword || f.value.password != f.value.confirmPassword){
      //this.errorMessage = "Email of wachtwoord komen niet overeen"
      //f.form.value.invalid;
    //}
    this.user.username = f.value.username;
    this.user.email = f.value.email;
    this.user.password = f.value.password;
    console.log(this.user)
    //API call
    this._authenticateService.signup(this.user).subscribe(
      res => {
        console.log(res);
        this.successMessage = "Account is met success aangemaakt!"
        this.router.navigate(['/']);
      }, 
      err=>{
        this.errorMessage = err.error.message;
      }
    );

   
  }

}
