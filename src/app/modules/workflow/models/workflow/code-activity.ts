import { NotificationsService } from "../../services/notifications.service";
import { Workflow } from "./workflow";

export class CodeActivity {
    constructor(
        public name: string, 
        private code: string, 
        private model: any,
        private workflow: Workflow,
        private notificationsService : NotificationsService
    ) { }

    execute(parameters: any) {
        const codeActivity = Function("model", "parameters", "workflow", "notificationsService", "return { run : function(){ " + this.code + " let a = new Activity(model, parameters, workflow, notificationsService); return a.execute(); } }");

        let zone = codeActivity(this.model, parameters, this.workflow, this.notificationsService);
        zone.run();
    }
}