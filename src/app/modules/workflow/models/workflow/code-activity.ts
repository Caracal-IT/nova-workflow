import {Activity} from "./activity";

export class CodeActivity extends Activity {
  code: string;

  constructor(
    metadata: any
  ) {
    super();
    Activity.mapAllFields(metadata, this);
  }

  execute(parameters: any) {
    const codeActivity = Function(
      "params", "wf", "notify",
      `return { run : function() { ${this.code} return execute(params, wf, notify); } }`
    );

    let zone = codeActivity(parameters, this.workflow, this.notificationService);
    zone.run();
  }
}
