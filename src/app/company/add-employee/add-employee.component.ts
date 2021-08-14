import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { CompanyService } from '../services/company.service';
import { NgForm } from '@angular/forms';
import { Company } from 'src/app/models/company.model';
import { UserService } from 'src/app/user/services/user.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  constructor(
    private router: Router, 
    private _companyService: CompanyService,
    private _userService: UserService,
  ) { }


  errorMessage: string = null;
  successMessage: string =null;
  userID = localStorage.getItem("userID");// userID == authenticated user id
  companyID =  localStorage.getItem('companyID');
  company = {} as Company;
  user = {} as User;
  ngOnInit(): void {
    this.findCompanyById(this.companyID);


  }

  email: string;
  onSubmit(f: NgForm) {

    this.findUserByEmailAndUpdateCompany(f.value.email);

  }

  findUserByEmailAndUpdateCompany(email: string){
    this._userService.findUserByEmail(email).subscribe(res =>{
        this.user = res;
        // check if user exists
        for(var i = 0; i < this.company.employees.length; i++){
          if(this.company.employees[i]._id == this.user._id){
            this.errorMessage = "Medewerker bestaat al"
            return;
          }
        }
        this.company.employees.push(this.user);
        this.updateCompanyById(this.companyID, this.userID, this.company);
        // update user
        this.user.companyID = this.companyID;
        this.updateUser(this.user._id, this.user);
      },
      err =>{
        this.errorMessage = err.error.message;
      }
    
    )

  }

  findCompanyById(id: string){
    this._companyService.findCompanyByID(id).subscribe(res =>{
      this.company = res;
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  updateCompanyById(id: string, userID: string, company: Company){
    this._companyService.updateCompanyById(id, userID, company).subscribe(res => {
      this.errorMessage = null;
      this.successMessage = "Gebruiker is toegevoegd"
    },
    err =>{
      this.errorMessage = err.error.message;
    }
    )
  }

  updateUser(id: string, user: User){
    this._userService.updateUser(id, user).subscribe(res => {
      this.successMessage = "Gebruiker is bijgewerkt"
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  
}
