import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/interfaces/user';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  /////////////
  // Atributes
  ////////////
  public loading: boolean = false;
  user$ = this.userServices.newUser$;
  public formUser: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', Validators.required),
  });

  constructor(
    private userServices: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  public validFields(field: string) {
    return (
      this.formUser.controls[field].errors &&
      this.formUser.controls[field].touched
    );
  }

  public createUser() {
    this.userServices.createUser(this.formUser.value).subscribe((res: User) => {
      this.userServices.newUser$.next([...this.user$.getValue(), res]);
      this.toastr.success('Added User', 'Succes');

      this.loading = true;
      setTimeout(() => {
        this.router.navigateByUrl('user');
      }, 1000);
    });
  }
}
