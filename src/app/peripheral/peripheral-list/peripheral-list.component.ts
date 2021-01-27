import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RepositoryService } from './../../shared/services/repository.service';
import { Peripheral } from './../../_interfaces/peripheral.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-peripheral-list',
  templateUrl: './peripheral-list.component.html',
  styleUrls: ['./peripheral-list.component.css']
})
export class PeripheralListComponent implements OnInit, AfterViewInit  {
  public peripherals: Peripheral[];
  public errorMessage: string = '';
  public displayedColumns = ['vendor', 'uid', 'createdDate', 'status', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Peripheral>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPeripheral();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getAllPeripheral = () => {
    let apiAddress: string = "api/peripherals";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.dataSource.data = res as Peripheral[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  public getPeripheralDetails = (id) => { 
    const detailsUrl: string = `/peripheral/details/${id}`; 
    this.router.navigate([detailsUrl]); 
  }

  public redirectToUpdatePage = (id) => { 
    const updateUrl: string = `/peripheral/update/${id}`; 
    this.router.navigate([updateUrl]); 
  }

  public redirectToDeletePage = (id) => { 
    const deleteUrl: string = `/peripheral/delete/${id}`; 
    this.router.navigate([deleteUrl]); 
  }
}
