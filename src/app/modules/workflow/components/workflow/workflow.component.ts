import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewContainerRef} from '@angular/core';
import {WorkflowService} from "../../services/workflow.service";
import {ActivatedRoute} from "@angular/router";
import {Workflow} from "../../models/workflow/workflow";

import 'rxjs/add/operator/switchMap';

@Component({
    template: `
       <ng-container
            *ngIf="workflow && model" 
            formBinder
            [config]="view" 
            [model]="model" 
            [wf]="workflow">
        </ng-container>
        `
})
export class WorkflowComponent implements OnInit {
    view: any;
    model: any;

    workflow: Workflow|undefined;
    component: ComponentRef<any> | undefined;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef,
        private workflowService: WorkflowService,
        private route: ActivatedRoute
    ) {  }

    ngOnInit() {
      this.route
        .params
        .switchMap(p => this.loadWorkflow(p))
        .subscribe(wf => {
          this.workflow = wf;
          this.workflow.next("start");
        });
    }

    private loadWorkflow(p: any) {
      return this.workflowService
        .load(p['wf'], (sender, eventArgs) => this.loadView(sender, eventArgs));
    }

  private loadView(sender: any, eventArgs: any) {
    if (this.workflow && this.workflow.model) {
      this.view = eventArgs;
      this.model = this.workflow.model;
    }
  }
}
