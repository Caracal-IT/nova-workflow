import {WorkflowEvents} from "../../../models/workflow/workflow-events";
import {Workflow} from "../../../models/workflow/workflow";
import {ActivityFactoryService} from "../activity-factory.service";

export class WorkflowBuilder {
  id;
  name;
  workflow;

  private constructor(
    private workflowDefinition: any,
    private callback: any,
    private activityFactory: ActivityFactoryService
  ) {
  }

  static build(workflowDefinition: any, callback: any, activityFactory: ActivityFactoryService) {
    const builder = new WorkflowBuilder(workflowDefinition, callback, activityFactory);

    return builder.buildWorkflow();
  }

  private buildWorkflow() {
    this.id = Guid.newGuid();
    this.name = this.workflowDefinition.name;

    WorkflowEvents.loading(this.id, this.name);

    this.workflow = new Workflow(this.id, this.name);
    this.buildActivities();

    WorkflowEvents.created(this.id, this.name);

    return this.workflow;
  }

  private buildActivities() {
    this.activityFactory.initialize(this.workflow, this.callback);

    for (let activity of this.workflowDefinition.activities) {
      const act = this.activityFactory.create(activity);

      if (act)
        this.workflow.activities.push(act);
    }
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
