import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../services/company.service';
import { Company } from 'src/app/models/company.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor(private _companyService: CompanyService, private router: Router) { }

  // cannot read property of length undefinde
  company = {} as Company;
  errorMessage: string = null;
  successMessage: string = null;
  companyID = localStorage.getItem('companyID');
  userID = localStorage.getItem('userID');

  ngOnInit(): void {
    // Get company
    this.findCompanyById();
   
  }


  findCompanyById(){
    if(this.companyID != null){
     this._companyService.findCompanyByID(this.companyID)
     .subscribe(res => {
         this.company = res;
         // check if employees
         if(this.company.employees.length == 0){
           this.errorMessage = "Nog geen medewerkers"
         }
         //console.log(res)
       },
       err=>{
         this.errorMessage = err.error.message;
       }
     )
 
    }
    else {
      this.errorMessage = "Fout bij het laden van gegevens, log opniew in!"
    }
  }

  removeUserFromCompanyAndUpdateCompany(id: string){
    
    for(var i = 0; i < this.company.employees.length; i++){
      if(this.company.employees[i]._id == id){
        const index: number = this.company.employees.indexOf(this.company.employees[i]);
        this.company.employees.splice(index, 1)
      }
    }

    //update the company => api call
    this.updateCompanyByID(this.companyID, this.userID, this.company);
    
  }

  updateCompanyByID(id: string, userID: string, company: Company){
    this._companyService.updateCompanyById(id, userID, company).subscribe(res => {
      this.errorMessage = null;
      this.successMessage = "Gebruiker is verwijderd"
    },
    err =>{
      this.errorMessage = err.error.message;
    }
    )
  }

  showEmployeeDetails(id: string){
    console.log(id);
    this.router.navigate(['/company/employees/employee/' + id])
  }

  


}
