import {Activity} from "./activity";
import {WorkflowEvents} from "./workflow-events";
import {Workflow} from "./workflow";

export class EmptyActivity extends Activity {
  constructor(private workFlow: Workflow) {
    super();
  }

  execute(parameters: any) {
    WorkflowEvents.activityNotFound(this.workFlow.workflowId, this.workFlow.name, name);
    this.notificationService.error("Workflow", `Activity with name ${this.name} was not found`);
  }
}
