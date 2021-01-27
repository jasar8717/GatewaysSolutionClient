import { Component, OnInit } from '@angular/core';
import { Peripheral } from './../../_interfaces/peripheral.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

@Component({
  selector: 'app-peripheral-details',
  templateUrl: './peripheral-details.component.html',
  styleUrls: ['./peripheral-details.component.css']
})
export class PeripheralDetailsComponent implements OnInit {
  public peripheral: Peripheral;
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private router: Router, 
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getPeripheralDetails()
  }
  
  getPeripheralDetails = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/peripherals/${id}`;
    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.peripheral = res as Peripheral;
    },
    (error) =>{
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }
}
