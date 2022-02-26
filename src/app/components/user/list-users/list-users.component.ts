import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/interfaces/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  //////////////
  //Atributes
  /////////////
  public p: number = 1;
  public users: User[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers.subscribe((data: User[]) => {
      this.users = data;
    });
  }

  public deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((res) => {
      this.users = this.users.filter((item) => item.id !== id);
      console.log('User deleted successfully!');
    });
  }
}
