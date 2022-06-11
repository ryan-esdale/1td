import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Alert, AlertType } from '../models/alert';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() alert!: Alert
  @ViewChild('contentBox') contentBox!: ElementRef;
  timeCreated = Date.now();
  expireTime!: number;
  display = true;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {



    if (this.alert.timeout) {
      this.expireTime = this.timeCreated + this.alert.timeout;
    }

    setInterval(() => {
      if (this.alert.timeout) {
        if (Date.now() > this.expireTime) {
          this.display = false;
        }
      }

    }, 1000)
  }

  ngAfterViewInit(): void {
    if (this.alert.text) {
      this.contentBox.nativeElement.innerHTML = this.alert.text
    }
  }

  get classString(): string {
    let str = "";
    if (this.alert.alertType == AlertType.SMALL)
      str += " small";
    if (this.alert.alertType == AlertType.DIALOG)
      str += " dialog";

    if (!this.display || Date.now() - this.timeCreated < 10)
      str += " hidden";
    else
      str += " show";

    return str
  }

  callback(): void {
    if (this.alert.callback)
      this.alert.callback();

    this.removeAlert();
  }

  removeAlert(): void {
    this.alertService.removeAlert(this.alert)
  }

}
