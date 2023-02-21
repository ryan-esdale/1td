export class Alert {

      title: string;
      text?: string;
      alertType: AlertType;
      timeout?: number;
      callback?: Function;
      createdTime: number;

      constructor(title: string, alertType: AlertType, text?: string, timeout?: number, callback?: Function) {

            this.title = title;
            this.text = text;
            this.alertType = alertType;
            this.timeout = timeout;
            this.callback = callback;

            this.createdTime = Date.now();
      }
}

export enum AlertType {
      DIALOG = "dialog",
      SMALL = "small"
}