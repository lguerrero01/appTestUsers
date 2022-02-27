import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  ///////////////
  // Atributes
  //////////////
  public id!: number;
  public user!: User;

  public formUser: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', Validators.required),
  });
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['userId']; //get user from params
    this.userService.findUser(this.id).subscribe((data: User) => {
      this.user = data;
      this.fillField();
    },
    (err) => {
      this.toastr.error('Error', 'User not found in Api');
    });

    this.formUser = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required),
    });
  }

  ///////////////
  // Functions
  //////////////
  public fillField() {
    this.formUser.patchValue({
      title: this.user.title,
      body: this.user.body,
    });
  }

  public validFields(field: string) {
    return (
      this.formUser.controls[field].errors &&
      this.formUser.controls[field].touched
    );
  }

  public editUser() {
    this.userService.updateUser(this.id, this.formUser.value).subscribe(
      (res) => {
        this.toastr.success('User edited', 'Succes');
        this.router.navigateByUrl('/user');
      },
      (err) => {
        this.toastr.error('Error');
      }
    );
  }
}
