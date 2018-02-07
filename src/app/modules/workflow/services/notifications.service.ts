import { Injectable } from '@angular/core';

@Injectable()
export class NotificationsService {
  parameters: any | undefined;

  error(title: string, message: string) {
    console.log(`${title} - ${message}`);
  }

  success(title: string, message: string) {
    console.log(`${title} - ${message}`);
  }

  info(title: string, message: string) {
    console.log(`${title} - ${message}`);
  }

  default(title: string, message: string) {
    console.log(`${title} - ${message}`);
  }

  warning(title: string, message: string) {
    console.log(`${title} - ${message}`);
  }

  wait(title: string, message: string) {
    console.log(`${title} - ${message}`);
  }

  cancelWait(){
    console.log("Cancel Wait");
  }

  clearAll() {
    console.log("Clear All");
  }
}
