import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  findUserById(id: string){
    return this.http.get<User>("http://localhost:8080/connectedb/users/user/"+ id);
  }

  updateUser(id: string, user: User){
    return this.http.put<User>("http://localhost:8080/connectedb/users/"+ id, user);
  }

  deleteRoleById(id: string, user_id: string){
    return this.http.delete<User>("http://localhost:8080/connectedb/users/user/" + user_id + "/role/" + id)
  }

  findAllUsersByCompanyId(id: string){
    return this.http.get<User[]>("http://localhost:8080/connectedb/users/company/"+ id);
  }

  findUserByEmail(email: string){
    return this.http.get<User>("http://localhost:8080/connectedb/users/user/email/" + email);
  }

  uploadProfilePic(id: string, file: File){
    const fd = new FormData();
    fd.append('profilePic', file)
    return this.http.put<any>("http://localhost:8080/connectedb/users/user/upload/profilepic/"+ id, fd);
  }


}
