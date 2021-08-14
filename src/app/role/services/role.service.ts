import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from 'src/app/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }


  findAllRoles(){
    return this.http.get<Role[]>("http://localhost:8080/connectedb/roles/");
  }

  findRoleById(id: string){
    return this.http.get<Role>("http://localhost:8080/connectedb/roles/" + id);
  }



}
