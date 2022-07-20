import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cartDTO } from 'src/app/model/cartDTO';
import { HttpService } from 'src/app/services/http/http.service';
@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  url: any = "/user";
  bookurl: string = "/book"
  carturl: string = "/cart"
  orderurl: string = "/order"

  constructor(
    private http : HttpService
  ) { }

  registerService(data: any){
    return this.http.post(this.url + '/register', data, this.options);
  }
  loginService(data: any) {
    return this.http.post(this.url + '/login', data, this.options);
  }
  forgotPasswordService(data: any){
    return this.http.put(this.url + '/forgotpassword', data, '');
  }
  getAllBook(){
    return this.http.get(this.bookurl + '/getBooks', {...this.options, headers : new HttpHeaders().set("token", localStorage.getItem("Token"))});
  }

  getAllUserCart(){
    return this.http.get(this.carturl + '/getAllUserCart', {...this.options, headers : new HttpHeaders().set("token", localStorage.getItem("Token"))});
  }
  addToCart(data : cartDTO){
    return this.http.post(this.carturl + '/addToCart', data, { ...this.options, headers : new HttpHeaders().set("token", localStorage.getItem("Token"))});
  }
  removeCartItem(cartId){
    return this.http.delete(this.carturl + `/removeCartItem/?cartId=${cartId}`, { ...this.options, headers : new HttpHeaders().set("token", localStorage.getItem("Token"))});
  }

  updateCartItem(data : cartDTO){
    return this.http.update(this.carturl + '/updateCartItem', data, { ...this.options, headers : new HttpHeaders().set("token", localStorage.getItem("Token"))});
  }

  getAllUserOrders(){
    return this.http.get(this.orderurl + '/getAllUserOrders', {...this.options, headers : new HttpHeaders().set("token", localStorage.getItem("Token"))});
  }
  placeOrders(data){
    return this.http.post(this.orderurl + '/placeOrder', data, {...this.options, headers : new HttpHeaders().set("token", localStorage.getItem("Token"))});
  }
}
  

