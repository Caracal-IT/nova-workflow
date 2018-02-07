import { EventEmitter } from "@angular/core";
import { Workflow } from "./workflow";
import {Activity} from "./activity";

export class FormActivity extends Activity {
    onViewChange = new EventEmitter<any>();
    config: any|undefined;

    constructor(
        public name: string,
        public form: any,
        public model: any,
        public wf: Workflow
    ) {
      super();
    }

    execute() {
        this.onViewChange.emit(this.form.controls);
    }
}
