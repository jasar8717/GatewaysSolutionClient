import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayDeleteComponent } from './gateway-delete.component';

describe('GatewayDeleteComponent', () => {
  let component: GatewayDeleteComponent;
  let fixture: ComponentFixture<GatewayDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewayDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
