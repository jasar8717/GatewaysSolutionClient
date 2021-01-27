import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Peripheral } from './../../_interfaces/peripheral.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from '../../shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-peripheral-delete',
  templateUrl: './peripheral-delete.component.html',
  styleUrls: ['./peripheral-delete.component.css']
})
export class PeripheralDeleteComponent implements OnInit {
  public errorMessage: string = '';
  public peripheral: Peripheral;
  public dialogConfig;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router, private activeRoute: ActivatedRoute, private location: Location, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPeripheralById();
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

  private getPeripheralById = () => {
    const peripheralId: string = this.activeRoute.snapshot.params['id'];
    const peripheralByIdUrl: string = `api/peripherals/${peripheralId}`;
    this.repository.getData(peripheralByIdUrl)
      .subscribe(res => {
        this.peripheral = res as Peripheral;
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }

  public redirectToPeripheralList = () => {
    this.router.navigate(['/peripheral/list']);
  }

  public deletePeripheral = () => {
    const deleteUrl: string = `api/peripherals/${this.peripheral.id}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessModalComponent, this.dialogConfig);
        dialogRef.afterClosed()
        .subscribe(result => {
          this.location.back();
        });
      },
      (error) => {
        this.errorHandler.dialogConfig = { ...this.dialogConfig };
        this.errorHandler.handleError(error);
      })
  }

}
