import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPositionComponent } from './crud-position.component';

describe('CrudPositionComponent', () => {
  let component: CrudPositionComponent;
  let fixture: ComponentFixture<CrudPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
