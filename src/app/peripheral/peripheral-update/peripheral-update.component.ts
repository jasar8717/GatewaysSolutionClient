import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Peripheral } from './../../_interfaces/peripheral.model';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from '../../shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-peripheral-update',
  templateUrl: './peripheral-update.component.html',
  styleUrls: ['./peripheral-update.component.css']
})
export class PeripheralUpdateComponent implements OnInit {
  public errorMessage: string = '';
  public peripheral: Peripheral;
  public peripheralForm: FormGroup;
  public dialogConfig;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router, private activeRoute: ActivatedRoute, private location: Location, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.peripheralForm = new FormGroup({
      vendor: new FormControl('', [Validators.required]),
      createdDate: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      uid: new FormControl('', [Validators.required])
    });
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
    this.getPeripheralById();
  }

  private getPeripheralById = () => {
    let peripheralId: string = this.activeRoute.snapshot.params['id'];
      
    let peripheralByIdUrl: string = `api/peripherals/${peripheralId}`;
    this.repository.getData(peripheralByIdUrl)
      .subscribe(res => {
        this.peripheral = res as Peripheral;
        this.peripheralForm.patchValue(this.peripheral);
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }

  public onCancel = () => {
    this.router.navigate(['/peripheral/list']);
  }

  public validateControl = (controlName: string) => {
    if (this.peripheralForm.controls[controlName].invalid && this.peripheralForm.controls[controlName].touched)
      return true;
    return false;
  }

  public hasError = (controlName: string, errorName: string)  => {
    if (this.peripheralForm.controls[controlName].hasError(errorName))
      return true;
    return false;
  }

  public executeDatePicker = (event) => {
    this.peripheralForm.patchValue({ 'createdDate': event });
  }

  public redirectToPeripheralList = () => {
    this.router.navigate(['/peripheral/list']);
  }

  public updatePeripheral = (peripheralFormValue) => {
    if (this.peripheralForm.valid) {
      this.executePeripheralUpdate(peripheralFormValue);
    }
  }
  
  private executePeripheralUpdate = (peripheralFormValue) => {
   
    this.peripheral.vendor = peripheralFormValue.vendor;
    this.peripheral.createdDate = peripheralFormValue.createdDate;
    this.peripheral.status = peripheralFormValue.status;
    this.peripheral.uid = peripheralFormValue.uid;
  
    let apiUrl = `api/peripherals/${this.peripheral.id}`;
    this.repository.update(apiUrl, this.peripheral)
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

}
