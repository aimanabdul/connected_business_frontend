import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import { Company } from 'src/app/models/company.model';
import { HttpClient } from '@angular/common/http';
import {CompanyService} from '../services/company.service';
@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {

  constructor(private http: HttpClient, private _companyService: CompanyService) { }

  ngOnInit(): void {
  }

  company = {} as Company;
  errorMessage: string = null;
  successMessage: string = null;
  create(f: NgForm){
    this.company.name = f.value.name;
    this.company.bio = f.value.bio;
    this.company.creatorID = localStorage.getItem("userID");
    this.company.address = f.value.address;
    this.company.postalCode = f.value.postal_code;
    this.company.city = f.value.city;
   
    // API call 
    this._companyService.createCompany(this.company).subscribe(
      res =>{
          console.log(res);
          this.successMessage = "Uw bedrijf " +res.name +" is met succes aangemaakt, Veel plezier Connected Bussiness!";
      },
      err=>{
        this.errorMessage = "Je kunt geen bedrijf aanmaken omdat u reeds een bedrijf hebt";
      }
    )
  }


}
