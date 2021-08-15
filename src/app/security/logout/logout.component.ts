import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  successMessage: string = null;
  errorMessage: string = null
  ngOnInit(): void {

    if(localStorage.getItem('userID')){
      localStorage.clear();
      this.successMessage = "U bent afgemeld"
      window.location.reload();
    }
    else {
      this.errorMessage = "404"
    }
  }

}
