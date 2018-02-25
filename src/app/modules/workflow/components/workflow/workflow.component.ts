import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewContainerRef} from '@angular/core';
import {WorkflowService} from "../../services/workflow.service";
import {ActivatedRoute} from "@angular/router";
import {Workflow} from "../../models/workflow/workflow";
import {LocationStrategy} from "@angular/common";

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
        private location: LocationStrategy,
        private route: ActivatedRoute
    ) {  }

    ngOnInit() {
        this.route
            .params
            .subscribe(p => this.loadWorkflow(p));
    }

    private loadWorkflow(p: any) {
      let activity = "start";
      delete this.workflow;

      this.workflowService
        .load(p['wf'], (sender, eventArgs) => this.loadView(sender, eventArgs))
        .subscribe(wf => {
            this.workflow = wf;
            this.workflow.location = this.location;

            this.workflow.next(activity);
        });
    }

  private loadView(sender: any, eventArgs: any) {
    if (this.workflow && this.workflow.model) {
      this.view = eventArgs;
      this.model = this.workflow.model;
    }
  }
}
