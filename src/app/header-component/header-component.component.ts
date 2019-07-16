import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';
import { AuthService } from '../core/shared/auth/auth.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {
  signOutEnable = false;

  constructor(private _sharedService: SharedService, private authService: AuthService) { }

  ngOnInit() {
    this._sharedService.signalEvent.subscribe(response => {
      console.log(response);
      if (response) {
        if (response.singoutEnable) {
          this.signOutEnable = true;
        } else {
          this.signOutEnable = false;
        }
      }
    });
  }

  serviceLogout(): void {
    this._sharedService.signalEvent.emit({signOutEnable: false});
    this.signOutEnable = false;
    this.authService.logout();
  }

}
