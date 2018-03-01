import {WorkflowEvents} from "./workflow-events";
import {EmptyActivity} from "./empty-activity";

export class Workflow {
  activities = [];
  model: any = {};

  constructor(public workflowId: string, public name: string) { }

  next(name: string) {
      const filter = this.activities.filter((act: any) => act.name == name);
      const activity = filter.length > 0 ? filter[0] : new EmptyActivity(this);

      WorkflowEvents.changingState(this.workflowId, this.name, name, activity.constructor.name);
      filter[0].execute();
      WorkflowEvents.changedState(this.workflowId, this.name, name, activity.constructor.name);
  }
}
