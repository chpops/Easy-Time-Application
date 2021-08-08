import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  form : FormGroup = new FormGroup({})

  constructor(private authService: AuthService) {
   }

  ngOnInit() { 
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(){
    this.authService.login(this.form.value).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        console.log(localStorage.getItem('token'));
        // this.router.navigate(['/private']);
    },
      err => {
        console.log(err);
      }
    )
  }
}
