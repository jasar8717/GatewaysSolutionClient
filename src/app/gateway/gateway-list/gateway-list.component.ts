import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RepositoryService } from './../../shared/services/repository.service';
import { Gateway } from './../../_interfaces/gateway.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-gateway-list',
  templateUrl: './gateway-list.component.html',
  styleUrls: ['./gateway-list.component.css']
})
export class GatewayListComponent implements OnInit, AfterViewInit  {
  public gateways: Gateway[];
  public errorMessage: string = '';
  public displayedColumns = ['name', 'address', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Gateway>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.getAllGateway();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getAllGateway = () => {
    let apiAddress: string = "api/gateways";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.dataSource.data = res as Gateway[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  public getGatewayDetails = (id) => { 
    const detailsUrl: string = `/gateway/details/${id}`; 
    this.router.navigate([detailsUrl]); 
  }

  public redirectToUpdatePage = (id) => { 
    const updateUrl: string = `/gateway/update/${id}`; 
    this.router.navigate([updateUrl]); 
  }

  public redirectToDeletePage = (id) => { 
    const deleteUrl: string = `/gateway/delete/${id}`; 
    this.router.navigate([deleteUrl]); 
  }
}
