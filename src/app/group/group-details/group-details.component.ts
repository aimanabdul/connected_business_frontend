import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { GroupService } from '../services/group.service';


@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private _groupService: GroupService, 
    private router: Router   
    
  ) {}

  groupID: string;
  group = {} as Group;
  errorMessage: string = null;
  successMessage: string = null;
  img="http://localhost:8080/uploads//angular_avatar.png"
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.groupID = params.id);
    this._groupService.findGroupById(this.groupID).subscribe(res => {
      this.group = res;
    },
    err => {
      this.errorMessage = err.error.message;
    }
    )
   
  }

}
