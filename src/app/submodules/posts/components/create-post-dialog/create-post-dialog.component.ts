import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IPost } from '@shared/services/data.models';
import { UserService } from '@shared/services/user.service';
import { Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostDialogComponent {
  form: FormGroup;
  postData: IPost = {
    title: '',
    body: '',
    userId: 1,
    id: 101
  };
  name: string;
  submitPressed: boolean;

  constructor(
    public dialogRef: MatDialogRef<CreatePostDialogComponent>,
    private userService: UserService)
    {
      this.name = this.userService.user.name;
      this.form = new FormGroup({
        title: new FormControl('', [Validators.required]),
        body: new FormControl('', [Validators.required]),
        userId: new FormControl(1),
        id: new FormControl(101)
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    const { value, valid } = this.form;
    if (valid) {
      this.dialogRef.close(value);
    } else {
      this.submitPressed = true;
    }
  }

  get title(): AbstractControl {
    return this.form.get('title');
  }

  get body(): AbstractControl {
    return this.form.get('body');
  }
}
