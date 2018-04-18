import {Workflow} from "./workflow";
import {NotificationsService} from "../../services/notifications.service";

export abstract class Activity {
  name: string;
  workflow: Workflow;
  notificationService: NotificationsService;

  abstract execute(parameters?: any|null);

  protected static mapAllFields(source: any, destination: any) {
    Object.assign(destination, source);
  }
}
