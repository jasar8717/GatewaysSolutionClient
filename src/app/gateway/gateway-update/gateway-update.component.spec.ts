import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayUpdateComponent } from './gateway-update.component';

describe('GatewayUpdateComponent', () => {
  let component: GatewayUpdateComponent;
  let fixture: ComponentFixture<GatewayUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewayUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
