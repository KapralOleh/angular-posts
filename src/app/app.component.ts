import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  username: string;
  userLink: string;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.username = this.userService.user.username;
    this.userLink = `users/${this.userService.user.id}`;
  }

  toggleSideNav(sideNav: MatSidenav): void {
    setTimeout(() => {
      sideNav.toggle();
      this.cdr.markForCheck();
    }, 100);
  }
}
