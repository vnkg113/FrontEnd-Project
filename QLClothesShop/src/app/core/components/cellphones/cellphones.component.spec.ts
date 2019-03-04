import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellphonesComponent } from './cellphones.component';

describe('CellphonesComponent', () => {
  let component: CellphonesComponent;
  let fixture: ComponentFixture<CellphonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellphonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellphonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
