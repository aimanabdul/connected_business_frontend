import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { GroupService } from '../services/group.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user/services/user.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.scss']
})
export class GroupMembersComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private _groupService: GroupService,
    private _userService: UserService,
  ) { }


  groupID: string;
  group = {} as Group;
  users: User[];
  companyID = localStorage.getItem("companyID");
  errorMessage: string = null;
  successMessage: string = null;
  img="http://localhost:8080/uploads//angular_avatar.png"

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.groupID = params.id);
    this.findGroupById(this.groupID);
    this.findAllUsersByCompanyId(this.companyID);
    
    
  }

  // lid toevoegen via email voor meer privacy, you dont know email, you dont know him
  addMember(f:NgForm){
    if(!f.value.email){
      this.errorMessage ="Email is vereist"
    }

    // find user by email
    this.findUserByEmailAndUpdateGroup(f.value.email);
    

  }

  findGroupById(id: string){
    this._groupService.findGroupById(id).subscribe(res => {
      this.group = res;
        if(res.members.length == 0){
          this.errorMessage = "Nog geen leden"
        }
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  findAllUsersByCompanyId(id: string){
    this._userService.findAllUsersByCompanyId(id).subscribe(res => {
        this.users = res;
      },
      err =>{
        this.errorMessage = err.message;
      }
    
    )
  }

  user = {} as User;
  findUserByEmailAndUpdateGroup(email: string){
    this._userService.findUserByEmail(email).subscribe(res => {
      this.user = res;
      // update user groups
      //this.user.groups.push(this.group);
      // update the user
      //this.updateUser(this.user);
      //push user to group.members
      this.group.members.push(this.user);
      // update group
      console.log(this.group)
      this.updateGroup(this.group._id, this.group)
      //window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  updateGroup(id: string, group: Group){
    this._groupService.updateGroup(this.group._id, this.group).subscribe(res =>{
      this.errorMessage = null;
      this.successMessage= "Groep is bijgewerkt!"
      },
      err => {this.errorMessage = err.error.message;}
    )
      
  }

  removeUserFromGroupByUserId(id: string){
    if(!id){
      this.errorMessage = "Geen gebruiker ingegeven!";
      return;
    }
    // first remove user from group
    for(var i = 0; i < this.group.members.length; i++){
      if(this.group.members[i]._id == id){
        const index: number = this.group.members.indexOf(this.group.members[i]);
        this.group.members.splice(index,1);
      }
    }
    // then update the group
    this.updateGroup(this.group._id, this.group)
    
  }

  updateUser(user: User){
    this._userService.updateUser(this.user._id, this.user)
  }

}
