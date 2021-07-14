import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', Validators.required],
    });
  }

  get f(): any { return this.loginForm.controls; }

  public login(event: Event): void {
    event.preventDefault();
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Obteniendo los datos
    const { email, password } = this.loginForm.value;

    // Llamame
    this.appService.login(email, password).subscribe((resp: any) => {
      // Guardando el token
      localStorage.setItem('sessionTokenBck', resp.sessionTokenBck);

      // Navegando
      this.router.navigate(['/booking']);
    }, (err) => console.log(err));
  }
}
