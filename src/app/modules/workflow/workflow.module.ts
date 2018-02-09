import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {HttpClientModule} from "@angular/common/http";
import {FormBinderDirective} from "./components/control-binder/form-binder.directive";
import {NovaFormService} from "./services/form.service";
import {FormsModule} from "@angular/forms";

import {WorkflowService} from './services/workflow.service';
import {WorkflowComponent} from './components/workflow/workflow.component';
import {WorkflowProviderService} from "./services/workflow-provider.service";
import {NotificationsService} from "./services/notifications.service";
import {Store} from "./services/store.service";

@NgModule({
    declarations: [
        FormBinderDirective,
        WorkflowComponent
    ],
    providers: [
      Store,
      NovaFormService
    ],
    exports: [
        WorkflowComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule
    ]
})
export class WorkflowModule {
    public static setWorkflowServerUrl(url: string){
        WorkflowProviderService.setUrl(url);
    }

    public static forRoot(
        providedNotificationService: Provider = {
            provide: NotificationsService,
            useClass: NotificationsService
        },
        providedFormService: Provider = {
            provide: NovaFormService,
            useClass: NovaFormService
        },
        workflowProviderService : Provider = {
            provide: WorkflowProviderService,
            useClass: WorkflowProviderService
        }
    ): ModuleWithProviders {
        return {
            ngModule: WorkflowModule,
            providers: [
                providedNotificationService,
                providedFormService,
                workflowProviderService,
                WorkflowService
            ]
        };
    }
}
