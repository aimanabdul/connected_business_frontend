import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { UserService } from './services/user.service';
import { ViewUpdateComponent } from './view-update/view-update.component';



@NgModule({
  declarations: [ViewUpdateComponent],
  providers:[UserService],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }
