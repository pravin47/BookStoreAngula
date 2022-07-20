import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookServiceService } from 'src/app/services/book/book-service.service';
const EMAIL_REGEX = new RegExp("^([a-zA-Z0-9+-])+(\\.?[a-zA-Z0-9_+-])*@[a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.]?[a-zA-Z]{2,3})?$")

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  Register:FormGroup;
  
  constructor(
    formBuilder:FormBuilder,
    private user: BookServiceService
  ) {
    this.Register = formBuilder.group(
      {
        firstName: ['', [Validators.required], ],
        lastName: ['', [Validators.required], ],
        dob: ['', [Validators.required], ],
        emailId: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
        password: ['', [Validators.required], ],
        expiryDate: ['', [Validators.required], ],
      }
    )
   }
   hide = true;

  ngOnInit(): void {
  }
  onSubmit(){
    if(this.Register.valid){
      console.log(this.Register.value);
      let Response = [] as any
      let Obj = {
        firstName:this.Register.value.firstName,
        lastName:this.Register.value.lastName,
        dob:this.Register.value.dob,
        emailId:this.Register.value.email, 
        password:this.Register.value.password,
        expiryDate:this.Register.value.expiryDate,
      }
      console.log(Obj);

      this.user.registerService(Obj).subscribe((resp)=>{
        console.log(resp)
      }, (error) => {
        console.log(error);
      
      })
    }
  }
}
