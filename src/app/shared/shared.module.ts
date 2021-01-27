import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { SuccessModalComponent } from './modals/success-modal/success-modal.component';
import { DatepickerDirective } from './directives/datepicker.directive';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ErrorModalComponent, SuccessModalComponent, DatepickerDirective],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [
    SuccessModalComponent,
    ErrorModalComponent
  ],
  exports: [
    ErrorModalComponent, 
    SuccessModalComponent, 
    DatepickerDirective,    
    MaterialModule,
    FlexLayoutModule,]
})
export class SharedModule { }
