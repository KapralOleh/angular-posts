import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { DetailedUserDialogComponent } from './components/detailed-user-dialog/detailed-user-dialog.component';
import { UserComponent } from './components/user/user.component';
import { UsersRoutingModule } from './users-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    UsersPageComponent,
    UserComponent,
    DetailedUserDialogComponent
  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class UsersModule { }
