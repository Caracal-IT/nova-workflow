import {NotificationsService} from "../../services/notifications.service";
import {HttpClient} from "@angular/common/http";
import {ApiActivity} from "./api-activity";
import {CodeActivity} from "./code-activity";
import {FormActivity} from "./form-activity";

export class Workflow {
  activities = [];
  model = {};

  constructor(public name: string) { }

  next(name: string) {
    if (this.activities && this.activities.length > 0) {
      const filter = this.activities.filter((act: any) => act.name == name);

      if (filter && filter.length >= 1)
        filter[0].execute();
    }
  }

  load(
    workflowDefinition: any,
    http: HttpClient,
    notificationService: NotificationsService,
    callback: any
  ) {
    for (let activity of workflowDefinition.activities) {
      if (this[activity.type]) {
        const act = this[activity.type](activity, http, callback);
        act.workflow = this;
        act.notificationService = notificationService;

        this.activities.push(act);
      }
    }
  }

  private ApiActivity(metadata: any, http: HttpClient, callback: any) {
    return new ApiActivity(metadata, http);
  }

  private CodeActivity(metadata: any, http: HttpClient, callback: any) {
    return new CodeActivity(metadata);
  }

  private FormActivity(metadata: any, http: HttpClient, callback: any) {
    return new FormActivity(metadata, callback);
  }
}
