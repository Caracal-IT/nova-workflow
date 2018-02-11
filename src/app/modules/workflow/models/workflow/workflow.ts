
import {NotificationsService} from "../../services/notifications.service";
import {HttpClient} from "@angular/common/http";
import {ApiActivity} from "./api-activity";
import {CodeActivity} from "./code-activity";
import {FormActivity} from "./form-activity";
import {LocationStrategy} from "@angular/common";
import {Store} from "../../services/store.service";
import {Metadata} from "../store/metadata";
import {WorkflowEvents} from "./workflow-events";
import {WorkflowProviderService} from "../../services/workflow-provider.service";

export class Workflow {
  workflowId: string;
  activities = [];
  model: any = {};
  metadata: Metadata;
  store: Store;
  location: LocationStrategy

  constructor(public name: string) {
    this.workflowId = Guid.newGuid();
    this.metadata = new Metadata(name, "start", this.model);

    WorkflowEvents.created(this.workflowId, this.name);
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

        WorkflowEvents.changingState(this.workflowId, this.name, name, filter[0].constructor.name);
        filter[0].execute();
        WorkflowEvents.changedState(this.workflowId, this.name, name, filter[0].constructor.name);

        return;
      }
    }

    WorkflowEvents.activityNotFound(this.workflowId, this.name, name);
    throw new Error("Activity not found");
  }

  load(
    workflowDefinition: any,
    http: HttpClient,
    notificationService: NotificationsService,
    callback: any
  ) {
    WorkflowEvents.loading(this.workflowId, this.name);

    for (let activity of workflowDefinition.activities) {
      if (this[activity.type]) {
        const act = this[activity.type](activity, http, callback);
        act.workflow = this;
        act.notificationService = notificationService;

        this.activities.push(act);
      }
    }

    WorkflowEvents.loaded(this.workflowId, this.name);
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

class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }
}
