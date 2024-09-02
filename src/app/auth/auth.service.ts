import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrls } from '../api.urls';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    http = inject(HttpClient)
    isLoggedIn$ = new BehaviorSubject<boolean>(false);
    userName$ = new BehaviorSubject<string>('');

    registerService(regObj: any) {
        return this.http.post<any>(`${apiUrls.authServiceApi}register`, regObj);
    }

    loginService(loginObj: any) {
        return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
    }

    isloggedIn() {
        return !!localStorage.getItem('user_id');
    }

    userName() {
        return localStorage.getItem('username');
    }
}
