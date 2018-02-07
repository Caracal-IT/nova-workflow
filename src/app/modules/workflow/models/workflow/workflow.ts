import {Activity} from "./activity";

export class Workflow {
    activities : any = [];
    model: any = {};

    constructor(public name: string){ }

    next(name: string){
        const act = this.getActivity(name);

        if (this.model && this.model.config) {
            this.model.config = null;
            delete this.model.config;
        }

        if (act)
            act.execute();
    }

    private getActivity(name: string): Activity|null {
        if (this.activities && this.activities.length > 0) {
            const filter = this.activities.filter((act: any) => act.name == name);

            if (filter && filter.length >= 1)
                return filter[0];
        }

        return null;
    }
}
