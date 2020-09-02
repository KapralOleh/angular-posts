import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IPost } from '../../../shared/services/data.models';
import { DataProviderService } from '@shared/services/data-provider.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreatePostDialogComponent } from '../create-post-dialog/create-post-dialog.component';
import { DetailedPostDialogComponent } from '../detailed-post-dialog/detailed-post-dialog.component';
import { UserService } from '@shared/services/user.service';
import { DeletePostDialogComponent } from '../delete-post-dialog/delete-post-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsPageComponent implements OnInit {
  userId: number;
  posts: IPost[];
  private lastPostId = 100;

  constructor(
    private dataProviderService: DataProviderService,
    public dialog: MatDialog,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private actRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.userId = this.userService.user.id;
    this.dataProviderService.getPostsWithComments().subscribe(
      (posts: IPost[]) => {
        this.posts = posts;

        this.openDetailedDialogByRoute();
        this.cdr.markForCheck();
      });
  }

  openCreatePost(): void {
    const dialogRef: MatDialogRef<CreatePostDialogComponent> = this.dialog.open(CreatePostDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe((result: IPost) => {
      if (result) {
        this.lastPostId++;
        result.userId = this.userId;
        result.id = this.lastPostId;
        result.userName = this.userService.user.name;
        this.dataProviderService.createPost(result).subscribe((data: IPost) =>  {
          this.posts.unshift(data);
          this.cdr.markForCheck();
        });
      }
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRef: MatDialogRef<DeletePostDialogComponent> = this.dialog.open(DeletePostDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.dataProviderService.deletePost(id).subscribe(() => {
          const index: number = this.posts.findIndex((post: IPost) => post.id === id);
          this.posts.splice(index, 1);
          this.cdr.markForCheck();
        });
      }
    });
  }

  openDetailedDialog(id: number): void {
    const postData: IPost = this.posts.find((post: IPost) => post.id === id);
    this.dialog.open(DetailedPostDialogComponent, {
      width: '80vw',
      data: postData
    });
  }

  trackByPostId(index: number, post: IPost): string {
    return `${index}_${post.id}`;
  }

  private openDetailedDialogByRoute(): void {
    const id = this.actRoute.snapshot.params.id;
    if (id) {
      this.openDetailedDialog(+id);
    }
  }
}
