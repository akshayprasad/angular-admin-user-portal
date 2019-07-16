import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './must-match.validator';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../core/framework/base.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends BaseComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private router: Router, _translateService: TranslateService) {
    super(router, _translateService);
  }

  ngOnInit() {
    this.registerTheForm();
  }

  registerTheForm = function () {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });

    this.submitted = false;
  };

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    const records = JSON.parse(localStorage.getItem('user-records')) || [];

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value);
    // Localstorage Integration
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
    this.router.navigate(['/login']);
    records.push(this.registerForm.value);
    localStorage.setItem('user-records' , JSON.stringify(records));
    // Localstorage Integration ends
    this.registerTheForm();
  }

}
