import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-server',
  templateUrl: './internal-server.component.html',
  styleUrls: ['./internal-server.component.css']
})
export class InternalServerComponent implements OnInit {
  public errorMessage: string = "500 SERVER ERROR, CONTACT ADMINISTRATOR!!!!";
  public reportedError: boolean;
  public errorPercentage: number = 0;
  public timer;

  constructor() { }

  ngOnInit(): void {
  }

  public checkChanged = (event) => {
    this.reportedError = event.checked;
    this.reportedError ? this.startTimer() : this.stopTimer();
  }

  private startTimer = () => {
    this.timer = setInterval(() => {
      this.errorPercentage += 1;
      if (this.errorPercentage === 100) {
        clearInterval(this.timer);
      }
    }, 30);
  }
  
  private stopTimer = () => {
    clearInterval(this.timer);
    this.errorPercentage = 0;
  }
}
