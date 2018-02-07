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
    const codeActivity = Function("model", "parameters", "workflow", "notificationsService", "return { run : function(){ " + this.code + " let a = new Activity(model, parameters, workflow, notificationsService); return a.execute(); } }");

    let zone = codeActivity(this.workflow.model, parameters, this.workflow, this.notificationService);
    zone.run();
  }
}
