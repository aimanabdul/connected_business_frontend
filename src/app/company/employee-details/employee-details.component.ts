import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { CompanyService } from '../services/company.service';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';
import { UserService } from 'src/app/user/services/user.service';
import { RoleService } from 'src/app/role/services/role.service';
import { NgForm } from '@angular/forms';
import { PositionService } from 'src/app/position/services/position.service';
import { Position } from 'src/app/models/position.model'; 

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, 
    private _companyService: CompanyService, 
    private _userService: UserService,
    private _roleService: RoleService,
    private _postionService: PositionService,
    
  ) { }


  user = {} as User;
  roles: Role[] = [];
  errorMessage: string = null;
  successMessage: string = null;
  userID: string;
  companyID = localStorage.getItem('companyID');
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.userID = params.id);
    this.findUserById(this.userID);
    this.findAllRoles();
    this.findPositionsByCompanyId(this.companyID)

    
  }

  role = {} as Role
  onSubmitAddRoleForm(f: NgForm){
    // if role empty
    if(f.value.role ==""){
      this.errorMessage = "Role is verplicht!"
      return;
    }

    this._roleService.findRoleById(f.value.role).subscribe(res => {
      // if role exist
      this.role = res;
      for(var i = 0; i < this.user.roles.length; i++ ){
        if(this.user.roles[i]._id == this.role._id){
          this.errorMessage = "Role bestaat al!"
          return;
        }
      }
      this.user.roles.push(res);

      // update the user
      this.updateUser(this.user._id, this.user);
      },
      err => {
        this.errorMessage = "Fout bij het toewijzen van Role"
      }
    )


  }


  toEditUser: User;
  onClickEditPosition(user: User){
    this.toEditUser = user
  } 


  
  onSubmitEditPositionForm(f: NgForm){
    // f.value.position = positionID
    if(!f.value.position){
      this.errorMessage = "Geen positie selected"
    }
    // edit to editUser
    this.toEditUser.position =  f.value.position
    this.updateUser(this.toEditUser._id, this.toEditUser)
    
  }


  findUserById(id: string){
    this._userService.findUserById(id).subscribe(res => {
      this.user = res;
      console.log(res)
      if(res.position!= null){
        this.findPositionById(res.position.toString())
      }
    },
    err =>{
      this.errorMessage = "Fout bij het laden van Employee"
    }
    )
  }

  deleteRoleById(id: string, userID: string){

    //delete rol from user
   for(var i = 0; i < this.user.roles.length; i++){
     if(this.user.roles[i]._id == id){
       this.user.roles.splice(i, 1)
     }
   }
   // update the user
   this.updateUser(userID, this.user)

  }

  findAllRoles(){
     this._roleService.findAllRoles().subscribe(res => {
       this.roles = res; 
     }, 
     err =>  {
       this.errorMessage = "Fout bij het laden van Roles"
     }
     )
  }

 

  updateUser(userID: string, user: User){
    this._userService.updateUser(userID, user).subscribe(res => {
      this.errorMessage = null;
      this.successMessage = "Gebruiker bijgewerkt";
      window.location.reload();
    },
    err => {
      this.errorMessage = err.error.message;
    })
  }

  positions: Position[];
  findPositionsByCompanyId(id: string){
    this._postionService.findPositionByCompanyId(id).subscribe(res => {
      this.positions = res;
    },
    err => {this.errorMessage = err.error.message;}
    )
  }

  position = {} as Position
  findPositionById(id: string){
    this._postionService.findPositionById(id).subscribe(res => {
      this.position = res;
    },
    err => {this.errorMessage = "Fout bij het laden van Positie"}
    )
  }

}
