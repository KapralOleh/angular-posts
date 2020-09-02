import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IUser } from '@shared/services/data.models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  @Input() user: IUser;
  @Output() openDialog: EventEmitter<number> = new EventEmitter();

  constructor() { }

  openDetailedDialog(id: number): void {
    this.openDialog.emit(id);
  }
}
