import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeripheralCreateComponent } from './peripheral-create.component';

describe('PeripheralCreateComponent', () => {
  let component: PeripheralCreateComponent;
  let fixture: ComponentFixture<PeripheralCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeripheralCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeripheralCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
