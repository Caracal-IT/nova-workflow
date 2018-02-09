
import {NotificationsService} from "../../services/notifications.service";
import {HttpClient} from "@angular/common/http";
import {ApiActivity} from "./api-activity";
import {CodeActivity} from "./code-activity";
import {FormActivity} from "./form-activity";
import {LocationStrategy} from "@angular/common";
import {Metadata, Store} from "../../services/store.service";

export class Workflow {
  activities = [];
  model: any = {};
  metadata: Metadata;
  store: Store;
  location: LocationStrategy

  constructor(public name: string) {
    this.metadata = new Metadata(name, "start", this.model);
  }

  next(name: string) {
    if (this.activities && this.activities.length > 0) {
      const filter = this.activities.filter((act: any) => act.name == name);

      if (filter && filter.length >= 1) {
        if(filter[0] instanceof FormActivity) {
          this.metadata.activity = filter[0].name;

          const url = `/${this.name}/${name}`;
          this.location.pushState({}, name, url, "");
        }

        this.metadata.model = this.model;
        this.store.setMetadata("workflowModel", this.metadata);

        filter[0].execute();
      }
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
