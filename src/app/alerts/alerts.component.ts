import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { Alert, AlertType } from './models/alert';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  alertArray: Alert[] = [];
  private _isActive: boolean = true;
  i = 3;
  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.alertService.alerts.pipe(takeWhile(_ => this._isActive)).subscribe(
      (alerts) => { this.alertArray = alerts }
    );

    // this.alertService.alert(new Alert("Test 1", AlertType.SMALL));
    // this.alertService.alert(new Alert("Test 2", AlertType.SMALL, 5000));
    // this.alertService.alert(new Alert("Dialog Test 1", AlertType.DIALOG, 2000));
    // this.alertService.alert(new Alert("Dialog Test 2", AlertType.DIALOG, undefined,
    //   "Text content goes here, this message should hold newlines properly. <br><br> And lets test that theory.", () => { alert("Callback triggered") }));

    //Test Alerts

    // setInterval(() => {
    //   this.alertService.alert(new Alert("Timed Test #" + this.i, AlertType.SMALL, Math.random() * 3000 + 1000));
    //   this.i++;
    // }, 2000)
  }

  ngOnDestroy(): void {
    this._isActive = false;
  }

  getDialogAlerts(): Alert[] {
    return this.alertArray.filter(alert => alert.alertType == AlertType.DIALOG)
  }

  getSmallAlerts(): Alert[] {
    return this.alertArray.filter(alert => alert.alertType == AlertType.SMALL)
  }

  clearSmallAlerts(): void {
    this.alertService.removeAllSmallAlerts();
  }
}
