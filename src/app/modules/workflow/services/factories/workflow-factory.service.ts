import {ActivityFactoryService} from "./activity-factory.service";
import {WorkflowBuilder} from "./builders/workflow.builder";
import {Injectable} from "@angular/core";

@Injectable()
export class WorkflowFactoryService {
  constructor(private activityFactory: ActivityFactoryService){ }

  create(workflowDefinition: any, callback: any) {
    return WorkflowBuilder.build(workflowDefinition, callback, this.activityFactory);
  }
}
