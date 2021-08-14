import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../services/company.service';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Company } from 'src/app/models/company.model';
import { FormControl } from '@angular/forms';
import {Router} from "@angular/router";
import {User} from 'src/app/models/user.model'


@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.scss']
})
export class ViewCompanyComponent implements OnInit {

  constructor(private _companyService: CompanyService, private router: Router, private _authenticateService: AuthenticateService) { }

  company = {} as Company;
  errorMessage: string = null;
  successMessage: string = null;
  companyID = localStorage.getItem('companyID');
  userID = localStorage.getItem('userID');
  user = {} as User;
  ngOnInit(): void {
    this.user = this._authenticateService.getAuthUser();
    console.log(this.user)
    // API call 
    this._companyService.findCompanyByID(this.companyID).subscribe(
      res =>{
          console.log(res);
          this.company = res;
          
      },
      err=>{
        this.errorMessage = "Error bij het opladen van bedrijfsgegevens";
      }
    );
  }


  onSubmit(){
    // API call 
    this._companyService.updateCompanyById(this.company._id, this.userID, this.company ).subscribe(
      res =>{
          console.log(res);
          this.successMessage = "Bedrijfsprofiel bijgewerkt!";
      },
      err=>{
        this.errorMessage = "Fout bij het bijwerken van bedrijfsprofiel, " || err.error.message;
      }
    )

  }

}
