import {WorkflowEvents} from "./workflow-events";

export class Workflow {
  activities = [];
  model: any = {};

  constructor(public workflowId: string, public name: string) { }

  next(name: string) {
    if (this.activities && this.activities.length > 0) {
      const filter = this.activities.filter((act: any) => act.name == name);

      if (filter && filter.length >= 1) {
        WorkflowEvents.changingState(this.workflowId, this.name, name, filter[0].constructor.name);
        filter[0].execute();
        WorkflowEvents.changedState(this.workflowId, this.name, name, filter[0].constructor.name);

        return;
      }
    }

    WorkflowEvents.activityNotFound(this.workflowId, this.name, name);
    throw new Error("Activity not found");
  }
}
