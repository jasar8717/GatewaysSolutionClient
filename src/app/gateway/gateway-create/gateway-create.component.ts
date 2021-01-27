import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GatewayForCreation } from './../../_interfaces/gatewayForCreation.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from '../../shared/modals/success-modal/success-modal.component';
import { Peripheral } from 'src/app/_interfaces/peripheral.model';

@Component({
  selector: 'app-gateway-create',
  templateUrl: './gateway-create.component.html',
  styleUrls: ['./gateway-create.component.css']
})
export class GatewayCreateComponent implements OnInit {
  public errorMessage: string = '';
  public gatewayForm: FormGroup;
  public dialogConfig;
  public peripherals: Peripheral;
  public selectedPeripheral: Peripheral[] = [];
  public validationmsg: boolean = true;
  public count = 0;
  public limit = 10;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router, private location: Location, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.gatewayForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.pattern("^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")])
    });
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
    this.getPeripherals();
  }

  private getPeripherals = () => {
      
    let gatewayByIdUrl: string = `api/peripherals/`;
    this.repository.getData(gatewayByIdUrl)
      .subscribe(res => {
        this.peripherals = res as Peripheral;
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }

  public onCancel = () => {
    this.router.navigate(['/gateway/list']);
  }

  public validateControl = (controlName: string) => {
    if (this.gatewayForm.controls[controlName].invalid && this.gatewayForm.controls[controlName].touched && this.selectedPeripheral.length <= 10)
      return true;
    return false;
  }
  public hasError = (controlName: string, errorName: string) => {
    if (this.gatewayForm.controls[controlName].hasError(errorName))
      return true;
    return false;
  }
  public executeDatePicker = (event) => {
    this.gatewayForm.patchValue({ 'createdDate': event });
  }
  public createGateway = (gatewayFormValue) => {
    if (this.gatewayForm.valid) {
      this.executeGatewayCreation(gatewayFormValue);
    }
  }
  private executeGatewayCreation = (gatewayFormValue) => {
    const gateway: GatewayForCreation = {
      name: gatewayFormValue.name,
      address: gatewayFormValue.address
    }
    const apiUrl = 'api/gateways';
    gateway.peripherals = this.selectedPeripheral.copyWithin(this.selectedPeripheral.length,0);
    this.repository.create(apiUrl, gateway)
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
  public redirectToGatewayList(){
    this.router.navigate(['/gateway/list']);
  }

  public checkChanged = (event , peripheral) => {
    if(event.checked)
    {
      this.count++;
      this.selectedPeripheral.push(peripheral);
    }
    else
    {
      this.count--;
      const index: number = this.selectedPeripheral.indexOf(peripheral);
      this.selectedPeripheral.splice(index, 1);
    }
  }

  public toggle = function (item) {
    this.selectedPeripheral = item;
  }
}
