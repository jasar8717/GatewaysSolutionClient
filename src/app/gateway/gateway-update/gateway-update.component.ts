import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Gateway } from './../../_interfaces/gateway.model';
import { GatewayForCreation } from './../../_interfaces/gatewayForCreation.model';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from '../../shared/modals/success-modal/success-modal.component';
import { Peripheral } from 'src/app/_interfaces/peripheral.model';

@Component({
  selector: 'app-gateway-update',
  templateUrl: './gateway-update.component.html',
  styleUrls: ['./gateway-update.component.css']
})
export class GatewayUpdateComponent implements OnInit {
  public errorMessage: string = '';
  public gateway: Gateway;
  public gatewayForm: FormGroup;
  public dialogConfig;
  public peripherals: Peripheral;
  public checked: boolean = true;
  public selectedPeripheral: Peripheral[] = [];
  public count = 0;
  public limit = 10;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router, private activeRoute: ActivatedRoute, private location: Location, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.gatewayForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
    this.getGatewayById();
    this.getPeripherals();
  }

  private getGatewayById = () => {
    let gatewayId: string = this.activeRoute.snapshot.params['id'];
      
    let gatewayByIdUrl: string = `api/gateways/${gatewayId}`;
    this.repository.getData(gatewayByIdUrl)
      .subscribe(res => {
        this.gateway = res as Gateway;
        this.selectedPeripheral = [...new Set(this.gateway.peripherals)];
        this.gatewayForm.patchValue(this.gateway);
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
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

  public exists = function (item, selectedPeripheral) {
    /*var isChecked = false;
    for (let value of this.gateway.peripherals)
    {
      if(value.id == item)
      {
        isChecked = true;
        this.selectedPeripheral.push(value);
      }
    }
    this.selectedPeripheral = [...new Set(this.selectedPeripheral)];
    return isChecked;*/
    //this.peripheral = item;
    //const tt = selectedPeripheral.filter(function(item1) { return item1.id == item.id; });
    return selectedPeripheral.filter(function(item1) { return item1.id == item.id; }).length > 0;
  };

  public toggle = function (item, list) {
    this.selectedPeripheral = [...new Set(this.selectedPeripheral)];
    this.count = this.selectedPeripheral.length;
    if(item.checked)
    {
      this.count++;
      this.selectedPeripheral.push(list);
    }
    else
    {
      this.count--;
      //const intid = list.id;
      
      //const index: number = this.selectedPeripheral.indexOf(intid);
      //this.selectedPeripheral.splice(index, 1);
      this.selectedPeripheral = this.arrayRemove(this.selectedPeripheral, list);
    }
  };

  public arrayRemove = (arr, value) =>  { 
    
    return arr.filter(function(item) { return item.id != value.id; });
  }

  public validateControl = (controlName: string) => {
    if (this.gatewayForm.controls[controlName].invalid && this.gatewayForm.controls[controlName].touched)
      return true;
    return false;
  }

  public hasError = (controlName: string, errorName: string)  => {
    if (this.gatewayForm.controls[controlName].hasError(errorName))
      return true;
    return false;
  }

  public executeDatePicker = (event) => {
    this.gatewayForm.patchValue({ 'createdDate': event });
  }

  public redirectToGatewayList = () => {
    this.router.navigate(['/gateway/list']);
  }

  public updateGateway = (gatewayFormValue) => {
    if (this.gatewayForm.valid) {
      this.executeGatewayUpdate(gatewayFormValue);
    }
  }
  
  private executeGatewayUpdate = (gatewayFormValue) => {
   
    //this.gateway.name = gatewayFormValue.name;
    //this.gateway.address = gatewayFormValue.address;
    const gateway: GatewayForCreation = {
      name: gatewayFormValue.name,
      address: gatewayFormValue.address
    }
    gateway.peripherals = this.selectedPeripheral.copyWithin(this.selectedPeripheral.length,0);
  
    let apiUrl = `api/gateways/${this.gateway.id}`;
    this.repository.update(apiUrl, gateway)
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

