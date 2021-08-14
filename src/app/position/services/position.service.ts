import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Position } from 'src/app/models/position.model';

@Injectable()
export class PositionService {

  constructor(
    private http: HttpClient,

  ) { }

  createPosition(position: Position){
    return this.http.post<Position>("http://localhost:8080/connectedb/positions", position);
  }

  findPositionById(id: string){
    return this.http.get<Position>("http://localhost:8080/connectedb/positions/" + id)
  }

  findPositionByCompanyId(id: string){
    return this.http.get<Position[]>("http://localhost:8080/connectedb/positions/company/" + id);
  }

  updatePosition(id: string, position: Position){
    return this.http.put<Position>("http://localhost:8080/connectedb/positions/" + id , position);
  }

  deletePosition(id: string){
    return this.http.delete<Position>("http://localhost:8080/connectedb/positions/" + id)
  }
}
