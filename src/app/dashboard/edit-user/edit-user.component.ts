import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/framework/base.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent extends BaseComponent implements OnInit {
    userForm: any;
    userInfo: any;
    submitted: boolean;
    constructor(_router: Router, _translateService: TranslateService, private formBuilder: FormBuilder) {
        super(_router, _translateService);
    }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });

        this.userInfo = JSON.parse(localStorage.getItem('edit-user')) || {};
        this.userForm.patchValue(this.userInfo);
    }

    // convenience getter for easy access to form fields
    get f() { return this.userForm.controls; }

    onSubmit() {
        this.submitted = true;
        let records = JSON.parse(localStorage.getItem('user-records')) || [];
        if (!(records instanceof Array)) {
          records = [records];
        }
        // stop here if form is invalid
        if (this.userForm.invalid) {
          return;
        }

        records.every((user: any) => {
            if (user.index === this.userInfo.index) {
                user.firstName = this.userForm.value.firstName;
                user.lastName = this.userForm.value.lastName;
                user.email = this.userForm.value.email;
                return false;
            }
            return true;
        });
        // records.push(this.userForm.value);
        this._router.navigate(['/dashboard']);
        localStorage.setItem('user-records' , JSON.stringify(records));
        // Localstorage Integration ends
      }

}
