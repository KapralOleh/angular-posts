import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPost, IComment } from '@shared/services/data.models';

@Component({
  selector: 'app-detailed-post-dialog',
  templateUrl: './detailed-post-dialog.component.html',
  styleUrls: ['./detailed-post-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedPostDialogComponent {
  limit = 3;

  constructor(
    public dialogRef: MatDialogRef<DetailedPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public post: IPost
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showMore(): void {
    this.limit += 3;
  }

  trackByCommentId(index: number, comment: IComment): string {
    return `${index}_${comment.id}`;
  }
}
