import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookServiceService } from 'src/app/services/book/book-service.service';
const EMAIL_REGEX = new RegExp("^([a-zA-Z0-9+-])+(\\.?[a-zA-Z0-9_+-])*@[a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.]?[a-zA-Z]{2,3})?$")
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Login:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private user: BookServiceService,
    private router: Router
    ) { 
      this.Login = formBuilder.group(
        {
          emailId: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
          password: ['', [Validators.required], ]
        }
      )
    }
    hide = true;
  ngOnInit(): void {
  }
  onSubmit(){
    if(this.Login.valid){
      console.log(this.Login.value);
      let Obj = {
        emailId:this.Login.value.emailId, 
        password:this.Login.value.password,
      }
      this.user.loginService(Obj).subscribe((resp: any)=>{
        console.log("Token - " + resp.data)
        localStorage.setItem('Token',resp.data);
        this.router.navigateByUrl('books');
      }, (error) => {
        console.log(error);
      })
    }
  }

}
