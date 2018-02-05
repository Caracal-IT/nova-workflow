import { Directive, Input, OnChanges, ViewContainerRef } from "@angular/core";
import {NovaFormService} from "../../services/form.service";

@Directive({
    selector: '[formBinder]'
})
export class FormBinderDirective implements OnChanges {
    @Input()
    model: any | undefined;

    @Input()
    config: any | undefined;

    @Input()
    wf: any;

    constructor(
                private formService: NovaFormService,
                private container: ViewContainerRef
    ) { }

    ngOnChanges() {
        this.formService.createComponent(
            this.container,
            this.config,
            this.model,
            this.wf
        );
    }
}
