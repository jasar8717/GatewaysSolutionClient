import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Gateway } from './../../_interfaces/gateway.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from '../../shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-gateway-delete',
  templateUrl: './gateway-delete.component.html',
  styleUrls: ['./gateway-delete.component.css']
})
export class GatewayDeleteComponent implements OnInit {
  public errorMessage: string = '';
  public gateway: Gateway;
  public dialogConfig;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router, private activeRoute: ActivatedRoute, private location: Location, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getGatewayById();
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
  }

  public onCancel = () => {
    this.router.navigate(['/gateway/list']);
  }

  private getGatewayById = () => {
    const gatewayId: string = this.activeRoute.snapshot.params['id'];
    const gatewayByIdUrl: string = `api/gateways/${gatewayId}`;
    this.repository.getData(gatewayByIdUrl)
      .subscribe(res => {
        this.gateway = res as Gateway;
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }

  public redirectToGatewayList = () => {
    this.router.navigate(['/gateway/list']);
  }

  public deleteGateway = () => {
    const deleteUrl: string = `api/gateways/${this.gateway.id}`;
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

