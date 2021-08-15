import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';

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

  noImageUrl = "http://localhost:8080/uploads/No_Image_Available.jpg";
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

  selectedFile: File = null;
  onFileSelected(event){
    this.selectedFile =  <File>event.target.files[0];
    console.log(event)
  }

  profilePicErrorMessage: string = null;
  
  successMessageUpload: string = null;
  errorMessageUpload: string = null;
  onClickUploadProfilePic(id: string){
    if(!id){
      this.profilePicErrorMessage = "Invalid input!";
      return;
    }
    if(this.selectedFile == null){
      this.profilePicErrorMessage = "Invalid input!";
      return;
    }

    this._userService.uploadProfilePic(id, this.selectedFile).subscribe(res => {
      console.log(res)
      this.successMessageUpload = "Profilefoto geupload!"
      window.location.reload();
    },
    err => {
      this.errorMessageUpload = "Fout bij het uploaden van foto"
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
