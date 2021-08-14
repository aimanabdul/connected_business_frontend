import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-view-update',
  templateUrl: './view-update.component.html',
  styleUrls: ['./view-update.component.scss']
})
export class ViewUpdateComponent implements OnInit {

  constructor(private _userService: UserService) { }

  errorMessage: string = null;
  successMessage: string =null;
  userID = localStorage.getItem('userID');
  user = {} as User;

  ngOnInit(): void {
    // get user 
    //console.log(this.userID)
    this.findUserById();
    

  }

  onSubmit() {
    this._userService.updateUser(this.userID, this.user)
      .subscribe(res => {
        this.user = res;
        this.findUserById();
        this.successMessage = "Gebruiker bijgewerkt"
      }, 
      err => {
        this.errorMessage = "Fout bij het bijwerken van gegevens!"
      }
      )
  }

  findUserById(){
    // api call
    this._userService.findUserById(this.userID)
      .subscribe(res =>{
        this.user = res;
      },
      err => {
        this.errorMessage = "Fout bij het laden van user gegevens"
      }
      )
  }

}
