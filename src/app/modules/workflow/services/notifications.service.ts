import { Injectable } from '@angular/core';

@Injectable()
export class NotificationsService {
    parameters: any|undefined;
    
    error(title: string, message: string){
        setTimeout(function () {alert(`${title} - ${message}`);}, 100);
    }

    success(title: string, message: string){
        setTimeout(function () {alert(`${title} - ${message}`);}, 100);
    }

    info(title: string, message: string){
        setTimeout(function () {alert(`${title} - ${message}`);}, 100);
    }

    default(title: string, message: string){
        setTimeout(function () {alert(`${title} - ${message}`);}, 100);
    }

    warning(title: string, message: string){
        setTimeout(function () {alert(`${title} - ${message}`);}, 100);
    }
    
    wait(title: string, message: string){
        console.log(`${title} - ${message}`)
    }

    clearAll(){
       console.log("Clear All");
    }
}