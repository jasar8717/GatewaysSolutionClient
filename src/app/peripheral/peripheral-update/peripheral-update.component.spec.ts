import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeripheralUpdateComponent } from './peripheral-update.component';

describe('PeripheralUpdateComponent', () => {
  let component: PeripheralUpdateComponent;
  let fixture: ComponentFixture<PeripheralUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeripheralUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeripheralUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
