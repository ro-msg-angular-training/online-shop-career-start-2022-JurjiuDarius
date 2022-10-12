import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-display',
  templateUrl: './login-display.component.html',
})
export class LoginDisplayComponent {
  @Input()
  formGroup: any;
  @Output()
  submitEmitter = new EventEmitter();

  onParentSubmit() {
    this.submitEmitter.emit();
  }
}
