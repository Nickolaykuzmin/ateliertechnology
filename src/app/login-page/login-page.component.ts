import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
    formGroup: FormGroup;

    constructor(
        private auth: AuthService
    ) { }

    ngOnInit() {
        this.formGroup = new FormGroup({
            Email: new FormControl('', [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            ]),
            Password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(20)
            ])
        });
    }


    onSubmit() {
        if (this.formGroup.valid) {
            this.auth.sendUserData(this.formGroup.get('Email').value, this.formGroup.get('Password').value).subscribe(value => {
                console.log(value);
                this.auth.getRequest(value.access_token).subscribe((response: Response) => {
                    console.log(response);
                })
            });
        }
    }

    onReset() {
        this.formGroup.reset();
    }

}
