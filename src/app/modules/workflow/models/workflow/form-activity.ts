import {Activity} from "./activity";

export class FormActivity extends Activity {
    config: any|undefined;
    form: any;

    constructor(
        metadata: any,
        private callback: any
    ) {
      super();
      Activity.mapAllFields(metadata, this);
    }

    execute() {
        if(this.callback)
          this.callback(this, this.form.controls);
    }
}
