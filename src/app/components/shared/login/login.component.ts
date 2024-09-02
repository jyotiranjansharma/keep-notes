import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup
    fb = inject(FormBuilder)
    router = inject(Router)
    authService = inject(AuthService)

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.required],
        })
    }

    login() {
        console.log(this.loginForm.value)
        this.authService.loginService(this.loginForm.value)
        .subscribe({
            next: (res) => {
                localStorage.setItem('user_id', res.data._id)
                localStorage.setItem('username', res.data.firstname);
                sessionStorage.setItem('token', res.token)
                this.authService.isLoggedIn$.next(true);
                this.authService.userName$.next(res.data.firstname);
                this.router.navigate(['home'])
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

}
