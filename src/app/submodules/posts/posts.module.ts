import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { PostComponent } from './components/post/post.component';
import { CreatePostDialogComponent } from './components/create-post-dialog/create-post-dialog.component';
import { DetailedPostDialogComponent } from './components/detailed-post-dialog/detailed-post-dialog.component';
import { DeletePostDialogComponent } from './components/delete-post-dialog/delete-post-dialog.component';
import { PostsRoutingModule } from './posts-routing.module';
import { MaterialModule } from '@material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostsPageComponent,
    PostComponent,
    CreatePostDialogComponent,
    DetailedPostDialogComponent,
    DeletePostDialogComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PostsModule { }
