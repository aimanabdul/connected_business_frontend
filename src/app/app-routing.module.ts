import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SigninComponent} from './security/signin/signin.component';
import { SignupComponent } from './security/signup/signup.component';
import { CreateCompanyComponent } from './company/create-company/create-company.component';
import { ViewCompanyComponent } from './company/view-company/view-company.component';
import { EmployeesComponent } from './company/employees/employees.component';
import { AddEmployeeComponent } from './company/add-employee/add-employee.component';
import { ViewUpdateComponent } from './user/view-update/view-update.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { EmployeeDetailsComponent } from './company/employee-details/employee-details.component';
import { ViewGroupsComponent } from './group/view-groups/view-groups.component';
import { GroupDetailsComponent } from './group/group-details/group-details.component';
import { GroupMembersComponent } from './group/group-members/group-members.component';
import { CrudPositionComponent } from './position/crud-position/crud-position.component';
import { LogoutComponent } from './security/logout/logout.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: ViewPostComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'company', 
    children: [
      { path: 'create', component: CreateCompanyComponent },
      { path: 'view', component: ViewCompanyComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'employees/add', component: AddEmployeeComponent },
      { path: 'employees/employee/:id', component: EmployeeDetailsComponent },
      { path: 'groups/view', component: ViewGroupsComponent },
      { path: 'groups/group/:id', component: GroupDetailsComponent },
      { path: 'groups/group/:id/members', component: GroupMembersComponent },
        
    ]
  },
  { path: 'positions', component: CrudPositionComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'users', 
    children: [
      { path: 'view', component: ViewUpdateComponent },
      
      
      
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
