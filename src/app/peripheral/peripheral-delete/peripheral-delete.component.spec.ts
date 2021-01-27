import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeripheralDeleteComponent } from './peripheral-delete.component';

describe('PeripheralDeleteComponent', () => {
  let component: PeripheralDeleteComponent;
  let fixture: ComponentFixture<PeripheralDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeripheralDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeripheralDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
