import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FormActivity} from "../models/workflow/form-activity";
import {ApiActivity} from "../models/workflow/api-activity";
import {CodeActivity} from "../models/workflow/code-activity";
import {Activity} from "../models/workflow/activity";
import {NotificationsService} from "./notifications.service";
import {Workflow} from "../models/workflow/workflow";

@Injectable()
export class ActivityFactoryService {
  workflow: Workflow;
  callback: any;

  constructor(
    private notificationService: NotificationsService,
    private http: HttpClient) {
  }

  initialize(
    workflow: Workflow,
    callback: any
  ) {
    this.workflow = workflow;
    this.callback = callback;
    this.notificationService.parameters = this.workflow.model;
  }

  create(activity: any): Activity {
    const actMethod = this.GetActivityMethod(activity.type);

    if (actMethod) {
      const act = actMethod(activity, this.http, this.callback);
      act.workflow = this.workflow;
      act.notificationService = this.notificationService;

      return act;
    }
  }

  GetActivityMethod(activity: string) {
    return this[activity];
  }

  protected ApiActivity(metadata: any, http: HttpClient, callback: any) {
    return new ApiActivity(metadata, http);
  }

  protected CodeActivity(metadata: any, http: HttpClient, callback: any) {
    return new CodeActivity(metadata);
  }

  protected FormActivity(metadata: any, http: HttpClient, callback: any) {
    return new FormActivity(metadata, callback);
  }
}
