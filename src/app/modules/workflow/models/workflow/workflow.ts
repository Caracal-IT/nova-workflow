export class Workflow {
    activities : any = [];
    public model: any = {};

    constructor(public name: string){ }

    next(name: string){
        const act = this.getActivity(name);

        if (this.model.config)
            console.log(this.model.config);
        
        if (this.model && this.model.config) {
            console.log(this.model.config);
            this.model.config = null;
            delete this.model.config;
        }
        
        if (act)
            act.execute();
    }

    private getActivity(name: string){
        if (this.activities && this.activities.length > 0) {
            const filter = this.activities.filter((act: any) => act.name == name);

            if (filter && filter.length >= 1)
                return filter[0];
        }

        return null;
    }
}