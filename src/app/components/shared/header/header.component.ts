import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    authService = inject(AuthService)
    router = inject(Router)
    isLoggedIn: Boolean = false
    userName: any = ''

    ngOnInit() {
        this.authService.isLoggedIn$.subscribe((res: any)=>{
            this.isLoggedIn = this.authService.isloggedIn()
        })
        this.authService.userName$.subscribe((res) => {
            this.userName = this.authService.userName()
        })
    }

    logout() {
        localStorage.removeItem('user_id')
        localStorage.removeItem('username')
        this.authService.isLoggedIn$.next(false);
        this.router.navigate(['/home']);
    }

}