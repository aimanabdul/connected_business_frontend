import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import { Company } from 'src/app/models/company.model';
import { HttpClient } from '@angular/common/http';
import {CompanyService} from '../services/company.service';
import { UserService } from 'src/app/user/services/user.service';
import { RoleService } from 'src/app/role/services/role.service';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {

  constructor(
    private http: HttpClient, 
    private _companyService: CompanyService,
    private _userService: UserService,
    private _roleService: RoleService,
    
  ) { }

  authUserID: string=null; 
  ngOnInit(): void {
    this.authUserID = localStorage.getItem("userID");
    if(this.authUserID == null){
      this.errorMessage = "Fout bij het laden van gegevens, log opnieuw in aub!";
      return;
    }
    this.findUserById(this.authUserID)
    this.findAllRoles();
  }

  company = {} as Company;
  errorMessage: string = null;
  successMessage: string = null;
  user = {} as User;
  create(f: NgForm){
    if(this.user.roles.length > 1){
      this.errorMessage = "U kan geen bedrijf aanmaken: u hebt al een bedrijf of u maakt deel uit een bedrijf";
      return;
    }
    this.company.name = f.value.name;
    this.company.bio = f.value.bio;
    this.company.creatorID = localStorage.getItem("userID");
    this.company.address = f.value.address;
    this.company.postalCode = f.value.postal_code;
    this.company.city = f.value.city;
    // api call
    this.createCompany(this.company);
    // add roles to user
    this.addRolesToUser(this.roles, this.user);
    //update user
    this.updateUser(this.user);

  }

  createdCompay = {} as Company
  createCompany(company: Company){
    this._companyService.createCompany(this.company).subscribe(
      res =>{
          this.company = res
          // set companyID in user
          this.user.companyID = res._id;
          // set company id in localStorage
          localStorage.setItem("companyID", res._id) ;
          //update user
          this.updateUser(this.user);
          this.successMessage = "Uw bedrijf is aangemaakt";
      },
      err=>{
        this.errorMessage = "Fout bij het aanmaken van een bedrijf";
      }
    )
  }

  findUserById(id: string){
    this._userService.findUserById(id).subscribe(res => {
      this.user = res;
    }, 
    err => {this.errorMessage = "Fout bij het laden van gebruikersgegevens"}
    )
  }

  updateUser(user: User){
    this._userService.updateUser(user._id, user).subscribe(res => {
      this.successMessage = "User successfully updated"
    },
    err => {this.errorMessage = "Error while updating user"}
    )
  }

  roles: Role[];
  findAllRoles(){
    this._roleService.findAllRoles().subscribe(res => {
      this.roles = res;
    },
    err => {this.errorMessage = "Fout bij het laden van roles"}
    )
  }

  addRolesToUser(roles: Role[], user: User){
    for(var i = 0; i < roles.length; i++){
      if(roles[i].name != "user")
      this.user.roles.push(roles[i]);
    }
  }




}
