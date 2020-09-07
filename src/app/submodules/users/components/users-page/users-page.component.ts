import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IUser } from '@shared/services/data.models';
import { DataProviderService } from '@shared/services/data-provider.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailedUserDialogComponent } from '../detailed-user-dialog/detailed-user-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent implements OnInit, OnDestroy {
  users: IUser[] = [];
  cols: string;
  private dataSubsription: Subscription;

  constructor(
    private dataProviderService: DataProviderService,
    private dialog: MatDialog,
    private actRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataSubsription = this.dataProviderService.getUsersWithPosts().subscribe(
      (users: IUser[]) => {
        this.users = users;

        this.openDetailedDialogByRoute();
        this.cdr.markForCheck();
      }, (error) => {
        console.error(error);
      });
  }

  ngOnDestroy(): void {
    this.dataSubsription && this.dataSubsription.unsubscribe();
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
