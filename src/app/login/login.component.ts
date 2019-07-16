import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../core/framework/base.component';
import { Router } from '@angular/router';
import { AuthService } from '../core/shared/auth/auth.service';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  @ViewChild('alerterror') alerterror: ElementRef;

  loginForm: any;
  submitted: boolean;
  invalidCredentials = false;
  isLoggedIn$: any;
  constructor(private formBuilder: FormBuilder, _translateService: TranslateService, _router: Router,
    private authService: AuthService, private _sharedService: SharedService) {
    super(_router, _translateService);
  }

  ngOnInit() {
    // this._sharedService.signalEvent.emit({signOutEnable: false});
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this._router.navigate(['/dashboard']);
      }
    });
    this.loginUser();
  }

  loginUser(): any {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.submitted = false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const loginForm = this.loginForm.value;
    if (loginForm.email === 'admin@gmail.com' && loginForm.password === 'Admin@123') {
      const adminInfo = JSON.stringify({userName: 'Admin'});
      this.authService.authCredentials(false, adminInfo);
    } else {
      this.invalidCredentials = true;
      let userRecords: any[] = JSON.parse(localStorage.getItem('user-records'));
      if (!(userRecords instanceof Array)) {
        userRecords = [userRecords];
      }
      userRecords.every((user: any) => {
        if (user.email === loginForm.email && user.password === loginForm.password) {
          this.invalidCredentials = false;
          user.userName = user.firstName + ' ' + user.lastName;
          const userInfo = JSON.stringify(user);
          this.authService.authCredentials(false, userInfo);
          return false;
        } else {
          this.authService.authCredentials(true);
          return true;
        }
      });
    }
    this.loginUser();
  }

}
