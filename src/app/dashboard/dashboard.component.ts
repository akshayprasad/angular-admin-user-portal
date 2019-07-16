import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  profileInfo!: any;
  userAdmin = false;
  userRecords: any [];
  url: any;

  constructor() { }

  ngOnInit() {
    this.url = 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg';
    this.userRecords = JSON.parse(localStorage.getItem('user-records'));
    if (!(this.userRecords instanceof Array)) {
      this.userRecords = [this.userRecords];
    }
    this.profileInfo = JSON.parse(localStorage.getItem('profile-info'));
    if (this.profileInfo && this.profileInfo.imgUrl) {
      this.url = this.profileInfo.imgUrl;
    }
    if (this.profileInfo) {
      if (this.profileInfo.userName === 'Admin') {
        const userName = {firstName: 'Anonymous', lastName: 'Anonymous', email: 'anonymous@gmail.com'};
        this.userAdmin = true;
        this.userRecords.push(userName);
      }
    }
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        const profileInfo = JSON.parse(localStorage.getItem('profile-info'));
        profileInfo.imgUrl = this.url;
        localStorage.setItem('profile-info', JSON.stringify(profileInfo));
        if (this.profileInfo.userName !== 'Admin') {
          this.userRecords.every((user: any) => {
            if ((user.firstName + ' ' + user.lastName) === this.profileInfo.userName) {
              user.imgUrl = this.url;
              return false;
            }
            return true;
          });
          localStorage.setItem('user-records', JSON.stringify(this.profileInfo));
        }
      };
    }
  }
}
