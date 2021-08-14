import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from 'src/app/models/company.model';



@Injectable()
export class CompanyService {

  constructor(private http: HttpClient) { }
  
  createCompany(company: Company){

    return this.http.post<Company>("http://localhost:8080/connectedb/company", company);
  }

  findCompanyByID(id: string){
    return this.http.get<Company>("http://localhost:8080/connectedb/company/"+ id);
  }

  updateCompanyById(company_id: string, user_id: string, company: Company){
    return this.http.put<Company>("http://localhost:8080/connectedb/company/"+ company_id + "/" + user_id, company);
  }

 
  addEmployee(company_id: string, email: string){
    return this.http.post<Company>("http://localhost:8080/connectedb/company/addemployee/"+ company_id, email);
  }

  company: Company;
  setCompany(data){
    this.company = data;
  }

  getCompany(){
    return this.company;
  }

  companyID:string;
  setCompanyID(data){
    this.companyID = data
  }

  getCompanyID(){
    return this.companyID;
  }



}
