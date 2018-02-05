import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewContainerRef} from '@angular/core';
import {WorkflowService} from "../../services/workflow.service";
import {ActivatedRoute} from "@angular/router";
import {Workflow} from "../../models/workflow/workflow";

@Component({
    template: `
       <ng-container
            *ngIf="workflow && model" 
            formBinder
            [config]='view' 
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
        this.workflowService
            .onViewChange
            .subscribe((view: any) => this.loadView(view));

        this.route
            .params
            .subscribe(p => this.loadWorkflow(p));
    }

    loadView(view: any) {
        if (this.workflow && this.workflow.model) {
            this.view = view;
            this.model = this.workflow.model;
        }
    }

    loadWorkflow(p: any){
        let workflow = this.workflowService.getWorkflow(p['wf']);

        if (workflow)
            this.gotoStart(workflow)
        else {
            this.workflowService
                .load(p['wf'])
                .subscribe(wf => this.gotoStart(wf));
        }
    }

    private gotoStart(workflow: Workflow){
        this.workflow = workflow;
        //this.route.snapshot.queryParams
        workflow.next('start');
    }
}
