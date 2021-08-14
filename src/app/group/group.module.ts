import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewGroupsComponent } from './view-groups/view-groups.component';
import { SharedModule } from '../shared/shared.module';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupMembersComponent } from './group-members/group-members.component';
import { AppRoutingModule } from '../app-routing.module';
import { UserService } from '../user/services/user.service';



@NgModule({
  declarations: [ViewGroupsComponent, GroupDetailsComponent, GroupMembersComponent],
  providers: [ UserService ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class GroupModule { }
