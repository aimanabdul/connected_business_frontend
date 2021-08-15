import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { LayoutComponent } from './layout/layout/layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Connected Businesses';

  constructor(private router: Router){}

  username: string = null
  userID: string = null;
  isSuperadmin: string = null;
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.userID = localStorage.getItem('userID');
    this.isSuperadmin = localStorage.getItem('isSuperadmin');
  }

   isMenuCollapsed = true;
}
