import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellphoneListComponent } from './cellphone-list.component';

describe('CellphoneListComponent', () => {
  let component: CellphoneListComponent;
  let fixture: ComponentFixture<CellphoneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellphoneListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellphoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
