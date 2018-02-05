import { NotificationsService } from '../../services/notifications.service';
import { HttpClient } from "@angular/common/http";

export class ApiActivity {
    api: string = "";
    method: string = "";
    nextActivity: string = "";
    mappings: any;

    constructor(
        act: any,
        private http: HttpClient,
        private model: any,
        private notificationService: NotificationsService
    ) {
        this.mapAllFields(act, this);
    }

    execute(parameters: any) {
        this.notificationService.clearAll();
        this.notificationService.wait('Workflow', 'Loading');

        let request = {};
        this.mapFields(this.model, request, 'in');

        if (parameters)
            this.mapAllFields(parameters, request);

        let http;

        if(this.method == 'get' && parameters && parameters.id)
            http = this.http.get(this.api + '/' + parameters.id);
        else if(this.method == 'get')
            http = this.http.get(this.api + this.getQueryString(request));
        else
            http = this.http.post(this.api, request);

        http.subscribe(
            resp => this.success(resp),
            error => this.error(error),
            () => this.notificationService.clearAll()
        );
    }

    success(response: any){
        if(Array.isArray(response))
            this.model["items"] = response;
        else
            this.mapFields(response, this.model, 'out');

        this.notificationService.clearAll();

        this.model.next(this.nextActivity);
    }

    error(error: any){
        this.notificationService.error("Error", error.message);
        this.model.next('error');
    }

    getQueryString(request: any){
        if(!request)
            return '';

        let params = [];

        for (let p in request) {
            if (request.hasOwnProperty(p))
                params.push(encodeURIComponent(p) + '=' + encodeURIComponent(request[p]));
        }

        return '?' + params.join('&');
    }

    mapFields(source: any, destination: any, direction: any){
        if (!this.mappings || this.mappings.length == 0)
            this.mapAllFields(source, destination);

        for (let map of this.mappings) {
            if(map.direction === direction || map.direction === 'inout')
                destination[map.source] = source[map.destination];
        }
    }

    mapAllFields(source: any, destination: any){
        for (let p in source) {
            if (source.hasOwnProperty(p) && source[p])
                destination[p] = source[p];
        }
    }
}
