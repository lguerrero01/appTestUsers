import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent implements OnInit {
  public id: number = this.route.snapshot.params['userId'];
  public user: User = {
    id: 0,
    title: '',
    body: '',
  };

  constructor(public userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userService.findUser(this.id).subscribe((data: User) => {
      this.user = data;
    });
  }
}
