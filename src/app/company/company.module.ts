import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompanyComponent } from './create-company/create-company.component';
import {SharedModule} from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CompanyService } from './services/company.service';
import { ViewCompanyComponent } from './view-company/view-company.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { LayoutModule } from '../layout/layout.module';
import { UserService } from '../user/services/user.service';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { PositionService } from '../position/services/position.service';
import { RoleService } from '../role/services/role.service';




@NgModule({
  declarations: [ CreateCompanyComponent, ViewCompanyComponent, EmployeesComponent, AddEmployeeComponent,  EmployeeDetailsComponent],
  providers:[CompanyService, UserService, PositionService, RoleService],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    LayoutModule

  ]
})
export class CompanyModule { }
