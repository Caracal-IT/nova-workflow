import { EventEmitter } from "@angular/core";
import { Workflow } from "./workflow";

export class FormActivity {
    onViewChange = new EventEmitter<any>();    
    config: any|undefined;    
    
    constructor(
        public name: string, 
        public form: any,
        public model: any,
        public wf: Workflow
    ) { }

    execute(parameters: any) {
        this.onViewChange.emit(this.form.controls);
    }
}