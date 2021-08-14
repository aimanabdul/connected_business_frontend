import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {SharedModule} from '../shared/shared.module';
import { AuthenticateService } from './services/authenticate.service';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';



@NgModule({
  declarations: [SigninComponent, SignupComponent, LogoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [AuthenticateService],
})
export class SecurityModule { }
