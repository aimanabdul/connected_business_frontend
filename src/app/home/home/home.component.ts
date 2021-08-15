import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  shareImg="http://localhost:8080/uploads//share_idea.png";
  moreConnectImg="http://localhost:8080/uploads//more_connection.jpg";
  wallpaperImage="http://localhost:8080/uploads//connected_business01.jpg"
  
  ngOnInit(): void {
  }

}
