import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GatewayListComponent } from './gateway-list/gateway-list.component';
import { GatewayDetailsComponent } from './gateway-details/gateway-details.component';
import { GatewayCreateComponent } from './gateway-create/gateway-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { GatewayUpdateComponent } from './gateway-update/gateway-update.component';
import { GatewayDeleteComponent } from './gateway-delete/gateway-delete.component';
import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [GatewayListComponent, GatewayDetailsComponent, GatewayCreateComponent, GatewayUpdateComponent, GatewayDeleteComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: 'list', component: GatewayListComponent },
      { path: 'details/:id', component: GatewayDetailsComponent },
      { path: 'create', component: GatewayCreateComponent },
      { path: 'update/:id', component: GatewayUpdateComponent },
      { path: 'delete/:id', component: GatewayDeleteComponent }
    ])
  ]
})
export class GatewayModule { }
