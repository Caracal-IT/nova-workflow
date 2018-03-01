import {WorkflowEvents} from "./workflow-events";
import {NullActivity} from "./null-activity";

export class Workflow {
  activities = [];
  model: any = {};

  constructor(public workflowId: string, public name: string) { }

  next(name: string) {
      const filter = this.activities.filter((act: any) => act.name == name);
      const activity = filter.length > 0 ? filter[0] : new NullActivity(this, name);

      WorkflowEvents.changingState(this.workflowId, this.name, name, activity.constructor.name);
      activity.execute();
      WorkflowEvents.changedState(this.workflowId, this.name, name, activity.constructor.name);
  }
}
