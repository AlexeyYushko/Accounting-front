import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { Message } from 'src/app/shared/models/message.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    // this.route.snapshot.queryParams.subscribe((params: Params) => {
    //   if (params['nowCanLogin']) {
    //     this.showMessage('Теперь вы можете зайти в систему', 'success');
    //   }
    // });
    combineLatest([this.route.params, this.route.queryParams])
    .pipe(map(results => ({params: results[0].login, query: results[1]})))
    .subscribe(results => {
      if (results.query['nowCanLogin']) {
            this.showMessage('success', 'Теперь вы можете зайти в систему');
          }
    });
  }

  private showMessage(type: string = 'danger', text: string) {
    this.message = new Message(type, text);

    window.setTimeout(() => {
      this.message.text = ''
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
              window.localStorage.setItem('user', JSON.stringify(user));
              this.authService.login();
              this.router.navigate(['/system', 'bill']);
          }
          else {
            this.showMessage('danger', `Wrong password`);
          }
        }
        else {
          this.showMessage('danger', `Account doesn'' exist`);
        }
      });
  }
}
