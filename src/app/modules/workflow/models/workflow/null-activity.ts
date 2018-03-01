import {Activity} from "./activity";
import {WorkflowEvents} from "./workflow-events";
import {Workflow} from "./workflow";

export class NullActivity extends Activity {
  constructor(private workFlow: Workflow, name: string) {
    super();

    this.name = name;
  }

  execute(parameters: any) {
    WorkflowEvents.activityNotFound(this.workFlow.workflowId, this.workFlow.name, this.name);
    this.notificationService.error("Workflow", `Activity with name ${this.name} was not found`);
  }
}
