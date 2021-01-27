import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeripheralDetailsComponent } from './peripheral-details.component';

describe('PeripheralDetailsComponent', () => {
  let component: PeripheralDetailsComponent;
  let fixture: ComponentFixture<PeripheralDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeripheralDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeripheralDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
