import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CrudPositionComponent } from './crud-position/crud-position.component';
import { PositionService } from './services/position.service';


@NgModule({
  declarations: [CrudPositionComponent],
  providers: [PositionService],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PositionModule { }
