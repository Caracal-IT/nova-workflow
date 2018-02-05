import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class WorkflowProviderService {
    private static baseUrl = "/api/workflow/";

    constructor(private http: HttpClient){ }

    getWorkflow(name: string) : Observable<any> {
        return this
            .http
            .get(WorkflowProviderService.baseUrl.replace("[name]", name));
    }

    static setUrl(url: string) {
        WorkflowProviderService.baseUrl = url;
    }
}
