import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {SharedModule} from '../shared/shared.module';
import { AuthenticateService } from './services/authenticate.service';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { UserService } from '../user/services/user.service';



@NgModule({
  declarations: [SigninComponent, SignupComponent, LogoutComponent],
  providers: [AuthenticateService, UserService],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ],
})
export class SecurityModule { }
