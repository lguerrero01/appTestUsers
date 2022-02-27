import { SpinnerComponent } from './../../shared/components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateUserComponent,
    EditUserComponent,
    ViewUserComponent,
    ListUsersComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
