import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from 'src/app/models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  findAllGroupsByCompanyId(company_id: string){
    return this.http.get<Group[]>("http://localhost:8080/connectedb/groups/company/" + company_id);
  }

  findGroupById(id: string){
    return this.http.get<Group>("http://localhost:8080/connectedb/groups/group/" + id);
  }

  createGroup(group: Group){
    return this.http.post<Group>("http://localhost:8080/connectedb/groups/", group);
  }

  updateGroup(id: string, group: Group){
    return this.http.put<Group>("http://localhost:8080/connectedb/groups/" + id , group);
  }

  deleteGroup(id: string){
    return this.http.delete<Group>("http://localhost:8080/connectedb/groups/" + id );
  }
}
