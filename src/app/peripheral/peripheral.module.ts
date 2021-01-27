import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PeripheralListComponent } from './peripheral-list/peripheral-list.component';
import { PeripheralDetailsComponent } from './peripheral-details/peripheral-details.component';
import { PeripheralCreateComponent } from './peripheral-create/peripheral-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { PeripheralUpdateComponent } from './peripheral-update/peripheral-update.component';
import { PeripheralDeleteComponent } from './peripheral-delete/peripheral-delete.component';
import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [PeripheralListComponent, PeripheralDetailsComponent, PeripheralCreateComponent, PeripheralUpdateComponent, PeripheralDeleteComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: 'list', component: PeripheralListComponent },
      { path: 'details/:id', component: PeripheralDetailsComponent },
      { path: 'create', component: PeripheralCreateComponent },
      { path: 'update/:id', component: PeripheralUpdateComponent },
      { path: 'delete/:id', component: PeripheralDeleteComponent }
    ])
  ]
})
export class PeripheralModule { }
