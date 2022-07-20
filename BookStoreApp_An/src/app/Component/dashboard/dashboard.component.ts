import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book/book-service.service';
import { cartDTO } from 'src/app/model/cartDTO';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  bookList: any;
  cartList: any;
  cartCount: number;
  constructor(private bookService: BookServiceService, private router: Router) { }



  ngOnInit(): void {
      this.getAllContacts();
      this.getCartDetails();
  }
  
  addItemToBag(id:number){
    var dto = new cartDTO();
    dto.bookId = id;
    dto.quantity = 2;
    this.bookService.addToCart(dto).subscribe((res: any) => {
      console.log(res); 
      if (res.statusCode === 200) {
        this.getCartDetails();
      }  
    },(error) => {
      console.log(error);
      
    });
  }
  getAllContacts(){
    this.bookService.getAllBook().subscribe((res: any) => {
      console.log(res);
      this.bookList = res;
    },(error) => {
      console.log(error);
    
    })
  }
  getCartDetails(){
    console.log("checked cart");
    this.bookService.getAllUserCart().subscribe((res: any) => {
      console.log(res);
      this.cartCount = res.length;
      this.cartList = res;
    }, (error) => {
      console.log(error);
      
    })
  }

  redirectToCart() {
    this.router.navigate(['/addtocart']);
  }
  isAdded(id:any) {
    var doesExist = this.cartList?.some(function(ele) {
      return ele.book.id === id;
  });
  return doesExist;
  
  }
  onLogout(){
    console.log("OnSubmit");
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}


