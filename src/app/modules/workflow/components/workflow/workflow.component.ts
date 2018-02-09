import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewContainerRef} from '@angular/core';
import {WorkflowService} from "../../services/workflow.service";
import {ActivatedRoute} from "@angular/router";
import {Workflow} from "../../models/workflow/workflow";
import {LocationStrategy} from "@angular/common";
import {Store} from "../../services/store.service";

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
        private route: ActivatedRoute,
        private store: Store
    ) {  }

    ngOnInit() {
        this.route
            .params
            .subscribe(p => this.loadWorkflow(p));
    }

    private loadWorkflow(p: any) {
      let activity = "start";

      this.workflowService
        .load(p['wf'], (sender, eventArgs) => this.loadView(sender, eventArgs))
        .subscribe(wf => {
            this.workflow = wf;
            this.workflow.store = this.store;

            this.workflow.location = this.location;

            if(p['act'] && p['act'].length > 0) {
              const metadata = this.store.getMetadata("workflowModel");
              if(metadata && p['act'] === metadata.activity){
                this.workflow.model = metadata.model;
                activity = p['act'];
              }
            }

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
