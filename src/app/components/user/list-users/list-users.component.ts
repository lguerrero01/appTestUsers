import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/interfaces/user';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  //////////////
  //Atributes
  /////////////
  public newData: any;
  public subscription!: Subscription;
  public p: number = 1;
  public users: User[] = [];
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers.subscribe(
      (data: User[]) => {
        this.users = [...this.userService.newUser$.getValue(), ...data];
      },
      (err) => {
        this.toastr.error('Reintente mas tarde ', 'error al cargar Users');
      }
    );
  }

  public deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((res) => {
      this.users = this.users.filter((item) => item.id !== id);
      this.toastr.success('User Deleted', 'Success');
    });
  }
}
