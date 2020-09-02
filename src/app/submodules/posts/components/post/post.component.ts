import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { IPost } from '@shared/services/data.models';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {
  @Input() post: IPost;
  @Input() userId: number;
  @Output() openDialog: EventEmitter<number> = new EventEmitter();
  @Output() openDeleteDialog: EventEmitter<number> = new EventEmitter();

  constructor() { }

  openDetailedDialog(id: number): void {
    this.openDialog.emit(id);
  }

  deletePost(id: number): void {
    this.openDeleteDialog.emit(id);
  }
}
