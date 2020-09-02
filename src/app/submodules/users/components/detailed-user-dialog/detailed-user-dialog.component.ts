import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser, IPost } from '@shared/services/data.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailed-user-dialog',
  templateUrl: './detailed-user-dialog.component.html',
  styleUrls: ['./detailed-user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedUserDialogComponent {
  limit = 3;

  constructor(
    public dialogRef: MatDialogRef<DetailedUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: IUser,
    private router: Router) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showMore(): void {
    this.limit += 3;
  }

  goToPost(id: string): void {
    this.dialogRef.close();
    this.router.navigateByUrl(`/posts/${id}`);
  }

  trackByPostId(index: number, post: IPost): string {
    return `${index}_${post.id}`;
  }
}
