import  {FormActivity} from "./form-activity";
import {LocationStrategy} from "@angular/common";
import {WorkflowEvents} from "./workflow-events";
import {ActivityFactoryService} from "../../services/activity-factory.service";

export class Workflow {
  workflowId: string;
  activities = [];
  model: any = {};
  location: LocationStrategy;

  constructor(public name: string) {
    this.workflowId = Guid.newGuid();

    WorkflowEvents.created(this.workflowId, this.name);
  }

  next(name: string) {
    if (this.activities && this.activities.length > 0) {
      const filter = this.activities.filter((act: any) => act.name == name);

      if (filter && filter.length >= 1) {
        if(filter[0] instanceof FormActivity) {
          const url = `/${this.name}/${name}`;
          this.location.pushState({}, name, url, "");
        }

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
    activityFactory: ActivityFactoryService,
    callback: any
  ) {
    WorkflowEvents.loading(this.workflowId, this.name);

    activityFactory.initialize(this, callback);

    for (let activity of workflowDefinition.activities) {
      const act = activityFactory.create(activity);

      if(act)
        this.activities.push(act);
    }

    WorkflowEvents.loaded(this.workflowId, this.name);
  }
}

class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }
}
