import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IUser } from '@shared/services/data.models';
import { DataProviderService } from '@shared/services/data-provider.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailedUserDialogComponent } from '../detailed-user-dialog/detailed-user-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent implements OnInit {
  users: IUser[];
  cols: string;

  constructor(
    private dataProviderService: DataProviderService,
    private dialog: MatDialog,
    private actRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataProviderService.getUsersWithPosts().subscribe(
      (users: IUser[]) => {
        this.users = users;

        this.openDetailedDialogByRoute();
        this.cdr.markForCheck();
      });
  }

  openDetailedDialog(id: number): void {
    const user: IUser = this.users.find((users: IUser) => users.id === id);
    this.dialog.open(DetailedUserDialogComponent, {
      width: '80vw',
      data: user
    });
  }

  trackByUserId(index: number, user: IUser): string {
    return `${index}_${user.id}`;
  }

  private openDetailedDialogByRoute(): void {
    const id = this.actRoute.snapshot.params.id;
    if (id) {
      this.openDetailedDialog(+id);
    }
  }
}
