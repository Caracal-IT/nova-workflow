import { Injectable } from '@angular/core';

import { Workflow } from '../models/workflow/workflow';
import { NotificationsService } from './notifications.service';

import {HttpClient} from "@angular/common/http";
import {WorkflowProviderService} from "./workflow-provider.service";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class WorkflowService {
  constructor(
    private workflowProviderService: WorkflowProviderService,
    private notificationService: NotificationsService,
    private http: HttpClient) {
  }

  load(name: string, callback: any) {
    this.notificationService.wait("Wait", "Loading");

    return this
      .workflowProviderService
      .getWorkflow(name)
      .map((workflowDefinition: any) => {
        this.notificationService.cancelWait();

        const workflow = new Workflow(workflowDefinition.name);
        workflow.load(workflowDefinition, this.http, this.notificationService, callback);

        return workflow;
      });
  }
}
