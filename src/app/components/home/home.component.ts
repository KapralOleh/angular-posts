import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  name: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.name = this.userService.user.name;
  }
}
