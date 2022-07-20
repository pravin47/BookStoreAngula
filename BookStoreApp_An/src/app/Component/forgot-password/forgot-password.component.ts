import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookServiceService } from 'src/app/services/book/book-service.service';
const EMAIL_REGEX = new RegExp("^([a-zA-Z0-9+-])+(\\.?[a-zA-Z0-9_+-])*@[a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.]?[a-zA-Z]{2,3})?$")
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  ForgotPassword:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private user: BookServiceService
  ) { 
    this.ForgotPassword = formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
        newPassword: ['', [Validators.required], ],
        confirmPassword:['', [Validators.required], ]
      }
    )
  }

  ngOnInit(): void {
  }
  onSubmit(){
    if(this.ForgotPassword.valid){
      console.log(this.ForgotPassword.value);
      let Obj = {
        email:this.ForgotPassword.value.email, 
        newPassword:this.ForgotPassword.value.newPassword,
        confirmPassword:this.ForgotPassword.value.confirmPassword
      }
      console.log(Obj);

      this.user.forgotPasswordService(Obj).subscribe((resp)=>{
        console.log(resp)
      }, (error) => {
        console.log(error);
      
      })
    }
  }
}
