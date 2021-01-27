import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PeripheralForCreation } from './../../_interfaces/peripheralForCreation.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from '../../shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-peripheral-create',
  templateUrl: './peripheral-create.component.html',
  styleUrls: ['./peripheral-create.component.css']
})
export class PeripheralCreateComponent implements OnInit {
  public errorMessage: string = '';
  public peripheralForm: FormGroup;
  public dialogConfig;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router, private location: Location, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.peripheralForm = new FormGroup({
      vendor: new FormControl('', [Validators.required]),
      createdDate: new FormControl('', [Validators.required]),
      uid: new FormControl('', [Validators.required]),
      status: new FormControl(false)
    });
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
  }

  public onCancel = () => {
    this.router.navigate(['/peripheral/list']);
  }

  public validateControl = (controlName: string) => {
    if (this.peripheralForm.controls[controlName].invalid && this.peripheralForm.controls[controlName].touched)
      return true;
    return false;
  }
  public hasError = (controlName: string, errorName: string) => {
    if (this.peripheralForm.controls[controlName].hasError(errorName))
      return true;
    return false;
  }
  public executeDatePicker = (event) => {
    this.peripheralForm.patchValue({ 'createdDate': event });
  }
  public createPeripheral = (peripheralFormValue) => {
    if (this.peripheralForm.valid) {
      this.executePeripheralCreation(peripheralFormValue);
    }
  }
  private executePeripheralCreation = (peripheralFormValue) => {
    const peripheral: PeripheralForCreation = {
      vendor: peripheralFormValue.vendor,
      createdDate: peripheralFormValue.createdDate,
      status: peripheralFormValue.status,
      uid: peripheralFormValue.uid
    }
    const apiUrl = 'api/peripherals';
    this.repository.create(apiUrl, peripheral)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessModalComponent, this.dialogConfig);
        dialogRef.afterClosed()
        .subscribe(result => {
          this.location.back();
        });
      },
      (error => {
        this.errorHandler.dialogConfig = { ...this.dialogConfig };
        this.errorHandler.handleError(error);
      })
    )
  }
  public redirectToPeripheralList(){
    this.router.navigate(['/peripheral/list']);
  }

}
