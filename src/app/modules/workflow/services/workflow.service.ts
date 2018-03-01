import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { WorkflowProviderService } from "./workflow-provider.service";
import { WorkflowFactoryService } from "./factories/workflow-factory.service";
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';


@Injectable()
export class WorkflowService {
  constructor(
    private workflowProviderService: WorkflowProviderService,
    private notificationService: NotificationsService,
    private workflowFactoryService: WorkflowFactoryService) {
  }

  load(name: string, callback: any): Observable<any> {
    this.notificationService.wait("Wait", "Loading");

    return this
      .workflowProviderService
      .getWorkflow(name)
      .map((workflowDefinition: any) => {
        this.notificationService.cancelWait();

        return this.workflowFactoryService.create(workflowDefinition, callback);
      });
  }
}
