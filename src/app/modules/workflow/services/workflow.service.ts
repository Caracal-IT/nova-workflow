import { EventEmitter, Injectable } from '@angular/core';

import { Workflow } from '../models/workflow/workflow';
import { ApiActivity } from '../models/workflow/api-activity';
import { CodeActivity } from '../models/workflow/code-activity';
import { FormActivity } from "../models/workflow/form-activity";
import { NotificationsService } from './notifications.service';

import {HttpClient} from "@angular/common/http";
import {WorkflowProviderService} from "./workflow-provider.service";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class WorkflowService {
  workflows: any = [];
  onViewChange = new EventEmitter<string>();

  constructor(
    private workflowProviderService: WorkflowProviderService,
    private notificationService: NotificationsService,
    private http: HttpClient) {
  }

  getWorkflow(name: string): Workflow | null {
    return this.workflows
               .filter((w: Workflow) => w.name == name);
  }

  load(name: string) {
    this.notificationService.wait("Wait", "Loading");

    return this
      .workflowProviderService
      .getWorkflow(name)
      .map((response: any) => {
        this.notificationService.cancelWait();

        let workflow = new Workflow(response.name);

        for (let act of response.activities) {
          if (act.type === "ApiActivity")
            workflow.activities.push(new ApiActivity(act, this.http, workflow.model, this.notificationService));
          if (act.type === "CodeActivity")
            workflow.activities.push(new CodeActivity(act.name, act.code, workflow.model, workflow, this.notificationService));
          if (act.type === "FormActivity") {
            const activity = new FormActivity(act.name, act.form, workflow.model, workflow);

            activity
              .onViewChange
              .subscribe((view: any) => {
                this.onViewChange.emit(view);
              });

            workflow.activities.push(activity);
          }
        }

        workflow.model.next = (activityName: any) => workflow.next(activityName);
        this.workflows.push(workflow);

        return workflow;
      });
  }
}
