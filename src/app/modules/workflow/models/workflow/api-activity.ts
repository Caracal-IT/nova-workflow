import {HttpClient} from "@angular/common/http";
import {Activity} from "./activity";
import {Workflow} from "./workflow";

export class ApiActivity extends Activity {
  api: string = "";
  method: string = "";
  nextActivity: string = "";
  mappings: any;

  constructor(
    metadata: any,
    private http: HttpClient
  ) {
    super();
    Activity.mapAllFields(metadata, this);
  }

  execute(parameters: any) {
    this.notificationService.clearAll();
    this.notificationService.wait('Workflow', 'Loading');

    let request = {};
    this.mapFields(this.workflow.model, request, 'in');

    if (parameters)
      Activity.mapAllFields(parameters, request);

    let http;

    if (this.method == 'get' && parameters && parameters.id)
      http = this.http.get(this.api + '/' + parameters.id);
    else if (this.method == 'get')
      http = this.http.get(this.api + ApiActivity.getQueryString(request));
    else
      http = this.http.post(this.api, request);

    http.subscribe(
      resp => this.success(resp),
      error => this.error(error),
      () => this.notificationService.cancelWait()
    );
  }

  private success(response: any) {
    if (Array.isArray(response))
      this.workflow.model["items"] = response;
    else
      this.mapFields(response, this.workflow.model, 'out');

    this.workflow.next(this.nextActivity);
  }

  private error(error: any) {
    this.notificationService.error("Error", error.message);
    this.workflow.next('error');
  }

  private mapFields(source: any, destination: any, direction: any) {
    if (!this.mappings || this.mappings.length == 0)
      ApiActivity.mapAllFields(source, destination);

    for (let map of this.mappings) {
      if (map.direction === direction || map.direction === 'inout')
        destination[map.source] = source[map.destination];
    }
  }

  private static getQueryString(request: any) {
    if (!request)
      return '';

    let params = [];

    for (let p in request) {
      if (request.hasOwnProperty(p))
        params.push(encodeURIComponent(p) + '=' + encodeURIComponent(request[p]));
    }

    return '?' + params.join('&');
  }
}
