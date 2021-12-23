import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @ViewChild('signInNgForm')
  signInNgForm!: NgForm;

  signInForm: FormGroup;
  showAlert: boolean = false;

  constructor(private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _fB: FormBuilder,
    private _router: Router
   ) { 
       // Create the form
       this.signInForm = this._fB.group({
        email     : [ localStorage.getItem('user') ||'', [Validators.required]],
        password  : ['', Validators.required],
        rememberMe: [false]
    });
   }

 


  ngOnInit(): void {
    

  }

  submit(){
    this.router.navigateByUrl('/admin');
  }

  signIn(): void
  {
      const {email,rememberMe} = this.signInForm.value
      console.log(email)
      // Return if the form is invalid
      if ( this.signInForm.invalid )
      {
          return;
      }
      // Disable the form
      this.signInForm.disable();

      // Hide the alert
      this.showAlert = false;

      // Sign in
       this._authService.signIn(this.signInForm.value)
          .subscribe(
              (resp:any) => {
                  if (email){
                      localStorage.setItem('user',email);
                  }else{
                      localStorage.removeItem('user');
                  }
                  
                  // Set the redirect url.
                  // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                  // to the correct page after a successful sign in. This way, that url can be set via
                  // routing file and we don't have to touch here.
                  const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/admin';
                  console.log(redirectURL)
                  // Navigate to the redirect url
                 this._router.navigateByUrl(redirectURL);

              },
              (response) => {
                  console.log(response)
                  // Re-enable the form
                  this.signInForm.enable();

                  // Reset the form
                  this.signInNgForm.resetForm();

             
                  // Show the alert
                  this.showAlert = true;
              }
          );
  }

}
