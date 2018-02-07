import {Injectable} from "@angular/core";
import {NotificationsService} from "./notifications.service";

@Injectable()
export class NovaFormService {
    constructor(private notificationService: NotificationsService) {}

    createComponent(container: any, config: any, model: any, wf: any) {
        this.notificationService.error("Error", "The form service is not implemented")
    }
}
