import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert, AlertType } from '../models/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private _alerts: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);

  constructor() {
    //Basic timer to clear up old alerts
    setInterval(() => {
      const now = Date.now();
      this._alerts.getValue().forEach(alert => {
        if (alert.timeout) {
          // Waits 2s past expiry time to account for fade out animcations.
          if (alert.timeout + alert.createdTime < now - 2000) {
            this.removeAlert(alert);
          }
        }
      });
    }, 1000)
  }

  public removeAlert(a: Alert): void {
    //Small alerts have callback called when they timeout or are removed
    if (a.alertType == AlertType.SMALL && a.callback) {
      a.callback();
    }
    this._alerts.next(this._alerts.getValue().filter(alert => a != alert));
  }

  public removeAllSmallAlerts(): void {
    this._alerts.getValue().forEach(a => {
      if (a.alertType == AlertType.SMALL && a.callback) {
        a.callback();
      }
    })
    this._alerts.next(this._alerts.getValue().filter(alert => alert.alertType != AlertType.SMALL));
  }

  public get alerts(): Observable<Alert[]> {
    return this._alerts.asObservable();
  }

  public alert(a: Alert): void {
    this._alerts.getValue().push(a);
  }

}
