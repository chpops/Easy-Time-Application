import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit, OnDestroy {

  form : FormGroup = new FormGroup({})
  aSub: Subscription = new Subscription()
  private token = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {
   }

  ngOnInit() { 
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe();
    }
  }

 onSubmit(){
    this.form.disable();

     this.aSub = this.authService.login(this.form.value).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        console.log(localStorage.getItem('token'));
        this.router.navigate(['/home']);
    },
      err => {
        console.log(err);
      }
    )
  }
}
