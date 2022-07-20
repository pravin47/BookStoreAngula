import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book/book-service.service';
import decode from 'jwt-decode'
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {
  // orderList: any;

  @Input('parentData') public orderList:any;
  decoded: any;
  constructor(private router : Router,private bookService: BookServiceService,) { }

  ngOnInit(): void {
    // this.getOderDetails();
    var token = localStorage.getItem('Token');
    this.decoded = decode(token);
    console.log(this.orderList);
    
  }
  continueShopping(){
    this.router.navigateByUrl("/books");
  }

  // getOderDetails(){
  //   this.bookService.getAllUserOrders().subscribe((res: any) => {
  //     console.log(res);
  //     this.orderList = res;
  //   },(error) => {
  //     console.log(error);
    
  //   })
  // }
}
