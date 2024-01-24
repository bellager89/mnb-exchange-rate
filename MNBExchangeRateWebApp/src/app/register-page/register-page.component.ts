import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, this.passwordValidator]),
    });
  }

  passwordValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const value: string = control.value;
  
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharacterRegex = /[-+!@#$%^&*(),.?":{}|<>]/;
  
    console.log(value)
    const hasLowercase = lowercaseRegex.test(value);
    const hasUppercase = uppercaseRegex.test(value);
    const hasDigit = digitRegex.test(value);
    const hasSpecialCharacter = specialCharacterRegex.test(value);
    const isLengthValid = value.length >= 8;
  
    return !hasLowercase || !hasUppercase || !hasDigit || !hasSpecialCharacter || !isLengthValid
      ? { passwordRequirements: true }
      : null;
  };

  get usernameControl() {
    return this.registerForm.get('username');
  }

  get emailControl() {
    return this.registerForm.get('email');
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  public onSubmit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      this.authenticationService.register(
        this.registerForm.get('username')!.value,
        this.registerForm.get('email')!.value,
        this.registerForm!.get('password')!.value
      );
    }
    
  }
}