import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { GroupService } from '../services/group.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-groups',
  templateUrl: './view-groups.component.html',
  styleUrls: ['./view-groups.component.scss']
})
export class ViewGroupsComponent implements OnInit {

  constructor(private _groupService: GroupService) { }

  groups: Group[];
  group={} as Group;
  errorMessage: string = null;
  successMessage: string = null;
  companyID = localStorage.getItem('companyID');
  userID = localStorage.getItem('userID');

  ngOnInit(): void {
    this.findAllGroupsByCompanyId(this.companyID);
  }

  findAllGroupsByCompanyId(id: string){
    this._groupService.findAllGroupsByCompanyId(id).subscribe(res => {
      this.groups = res;
    },
    err => {
      this.errorMessage = err.error.message;
    }
    )
  }


  createGroup(f: NgForm){
    this.group.name = f.value.name;
    this.group.companyID = this.companyID;
    for(var i = 0; i<this.groups.length; i++){
      if(f.value.name == this.groups[i].name){
        this.errorMessage = "Groups bestaat al, kies een andere naam!";
        return;
      }
    }
    this._groupService.createGroup(this.group).subscribe(res => {
      this.errorMessage = null;
      this.successMessage = "Groep is aangemaakt"
    },
    err => {
      this.errorMessage = err.error.message;
    }
    )


  }

  deleteGroup(id: string){
    this._groupService.deleteGroup(id).subscribe(res => {
      this.successMessage = "Groep is verwijderd"
    },
    err => {
      this.errorMessage = err.error.message;
    }
    )

    this.findAllGroupsByCompanyId(this.companyID);
    window.location.reload();
  }

  showDetails(id: string){
    console.log(id)
  }

}
