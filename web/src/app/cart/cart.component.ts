import { Component, OnInit } from '@angular/core';
import { SubdivisonService } from '../services/subdivison.service';
import { DialogService } from '../services/dialog.service';
import { MydialogComponent } from '../mydialog/mydialog.component';
import { CartItems } from '../models/Product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: false
})
export class CartComponent implements OnInit {
  cartItems: Array<CartItems> = [];
  totalCartPrice: number = 0;
  constructor(private subdivisonService: SubdivisonService, 
    private dialogService: DialogService,
    private _snackBar: MatSnackBar,
  ) {
    this.getCartItems();
   }

  ngOnInit(): void {
  }

  getCartItems () {
    const uInfo: any = sessionStorage.getItem('user_info');
    const user_info = JSON.parse(uInfo);
    if(user_info && Object.keys(user_info).length !== 0) {
      this.subdivisonService.getCartItems(user_info.user_id).subscribe({
        next: (response) => {
          this.cartItems = response.data;
          this.totalCartPrice = this.cartItems.reduce((acc, cur) => acc + Number(cur.price), 0);
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    } else {
      this.dialogService.openDialog(MydialogComponent, { message: 'Hello from dynamic dialog!' })
      .subscribe(result => {
        this.getCartItems();
      });
    }
  }

  removeFromCart(cart: any) {
    console.log(cart);
    this.subdivisonService.removeFromCart({user_id: cart.user_id, product_id: cart.product_id, cart_id: cart.cart_id}).subscribe({
      next: (response) => {
        this._snackBar.open('Removed','', {
          duration: 1000,
          announcementMessage: 'Removed',
          panelClass: ['blue-snackbar'],
          verticalPosition: 'top'
        });
        this.getCartItems();
      },
      error: (error) => {
        console.error('Cart removal failed', error);
      }
    });
  }

}
