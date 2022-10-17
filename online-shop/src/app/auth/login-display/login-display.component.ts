import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-display',
  templateUrl: './login-display.component.html',
})
export class LoginDisplayComponent {
  @Input()
  formGroup: FormGroup | undefined;
  @Input()
  status: String | undefined;
  @Output()
  submitEmitter = new EventEmitter();

  onParentSubmit() {
    this.submitEmitter.emit();
  }
}
