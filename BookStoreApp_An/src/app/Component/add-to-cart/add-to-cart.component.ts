import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cartDTO, orderDTO } from 'src/app/model/cartDTO';
import { BookServiceService } from 'src/app/services/book/book-service.service';
const EMAIL_REGEX = new RegExp("^([a-zA-Z0-9+-])+(\\.?[a-zA-Z0-9_+-])*@[a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.]?[a-zA-Z]{2,3})?$")


@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  AddCart:FormGroup;
  cartList: any;
  showCustomerDetails = false;
  showOrderDetails = false;
  isCheckout: Boolean = false
  quantityObj: any = {};
  quantity: number = 0; 
  orderObj: any = {};
  price: any;
  selectedCart:any;
  dto = new orderDTO();
  checkoutData : any = {};
  constructor(private bookService: BookServiceService, private router: Router,  formBuilder:FormBuilder,) {
    this.AddCart = formBuilder.group(
      {
        firstName: ['', [Validators.required], ],
        phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        pincode: ['',[Validators.required,Validators.maxLength(6)]],
        locality: ['', [Validators.required ]],
        address: ['', [Validators.required], ],
        city: ['', [Validators.required], ],
        landmark: ['', [Validators.required], ],
        type: ['', Validators.required]
      }
    )
   }

 ngOnInit(): void {
   this.getCartDetails();
   console.log(this.quantityObj);
   

}


getCartDetails(){
  console.log("checked cart");
  this.bookService.getAllUserCart().subscribe((res: any) => {
    console.log(res);
    this.cartList = res;
    res?.forEach(el => {
      this.quantityObj[el.id] = el.quantity;
    });
  })
}

  placeOrder(cart:any)
  {
    this.selectedCart = cart;
    this.dto.bookId = cart.book.id;
    this.dto.price = cart.book.price;
    this.dto.quantity = cart.quantity;
    
    this.showCustomerDetails = true;
  }
  checkout(){
   //API call
   this.bookService.placeOrders(this.dto).subscribe((res: any) => {
    if (res.statusCode === 200) {
      this.checkoutData.address = this.AddCart.value.address;
      this.checkoutData.mobile = this.AddCart.value.phoneNumber;
      this.checkoutData.name = this.AddCart.value.firstName;
      this.isCheckout = true;
    }  
  },(error) => {
    console.log(error);
  });
  }
  continue(){
    this.dto.address = this.AddCart.value.address;
    this.showOrderDetails = true;
  }
  onLogout()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  decrement(id: any, bookId: any){
    this.quantityObj[id] = this.quantityObj[id] - 1;
    var dto = new cartDTO();
    dto.bookId = bookId;
    dto.quantity = this.quantityObj[id];
    this.updateCart(dto);
    
  }
  increment(id: any, bookId: any){
    this.quantityObj[id] = this.quantityObj[id] + 1;
    var dto = new cartDTO();
    dto.bookId = bookId;
    dto.quantity = this.quantityObj[id];
    this.updateCart(dto);
  }

  updateCart(dto:cartDTO){
    this.bookService.updateCartItem(dto).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.getCartDetails();
      }  
    },(error) => {
      console.log(error);
      
    });
  }

  removeFromCart(id) {
    this.bookService.removeCartItem(id).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.getCartDetails();
      }  
    },(error) => {
      console.log(error);
      
    });
  }
 
}
