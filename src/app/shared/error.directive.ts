import { Directive, ElementRef, Host, Input, Optional, SkipSelf, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[appErrorDirective]'
})
export class ErrorDirective {
  formControl: FormGroupDirective;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    @Optional() @Host() @SkipSelf() parent: ControlContainer ) {
      if (parent) {
        this.formControl = parent.formDirective as FormGroupDirective;
      }
    }

  @Input() set appErrorDirective(controlName: string) {
    const formControl = this.formControl.form.get(controlName);
    formControl.statusChanges.subscribe((status) => {
      this.updateStatus(status);
    });

    this.updateStatus(formControl.status);
  }

  private updateStatus(status): void {
    this.viewContainer.clear();

    if (status === 'INVALID') {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}


// error interceptor - error from client+server
// clear code
