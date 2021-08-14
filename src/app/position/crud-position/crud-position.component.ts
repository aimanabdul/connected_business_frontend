import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Position } from 'src/app/models/position.model';
import { PositionService } from '../services/position.service';

@Component({
  selector: 'app-crud-position',
  templateUrl: './crud-position.component.html',
  styleUrls: ['./crud-position.component.scss']
})
export class CrudPositionComponent implements OnInit {

  constructor(
    private _positionService: PositionService,
  ) { }

  positions: Position[];
  errorMessage: string = null;
  successMessage: string = null;
  companyID = localStorage.getItem("companyID")


  ngOnInit(): void {
    this.findPositionsByCompanyId(this.companyID)
  }

  
  onClickDelete(id: string){
    console.log(id)
    this.deletePosition(id);
  }

  
  onClickEdit(id: string){
    console.log(id)
    this.findPositionById(id);
  }



  createPosition(position: Position){
    this._positionService.createPosition(position).subscribe(res => {
      this.successMessage = "Position is aangemaakt";
      window.location.reload();
    },
    err => {this.errorMessage = "Fout bij het maken van positie"}
    )
  }

  
  findPositionsByCompanyId(id: string){
    this._positionService.findPositionByCompanyId(id).subscribe(res => {
      this.positions = res
      console.log(res);
    },
    err => {this.errorMessage = err.error.message;}
    )
  }

  toCreatePosition = {} as Position
  onSubmitPositionForm(f: NgForm){

    if(!f.value.name){
      this.errorMessage = "naam is vereist!";
      return;
    }

    this.toCreatePosition.name = f.value.name;
    this.toCreatePosition.companyID =  this.companyID

    this.createPosition(this.toCreatePosition);

  }

  onSubmitEditPositionForm(){
    if(!this.position.name){
      this.errorMessage = "naam is vereist!";
      return;
    }

    this.updatePosition(this.position._id, this.position);
  }


  position = {} as Position;
  findPositionById(id: string){
    this._positionService.findPositionById(id).subscribe(res => {
      this.position = res
      
    },
    err => {this.errorMessage = err.error.message;}
    )
  }


  updatePosition(id: string, position: Position){
    this._positionService.updatePosition(id, position).subscribe(res => {
      this.successMessage = "Positie is geupdated";
      window.location.reload();
    },
    err => {this.errorMessage = err.error.message;}
    )
  }


  deletePosition(id: string){
    this._positionService.deletePosition(id).subscribe(res => {
      this.successMessage = "Positie is verwijderd";
      window.location.reload();
    },
    err => {this.errorMessage = err.error.message;}
    )
  }

  

}
