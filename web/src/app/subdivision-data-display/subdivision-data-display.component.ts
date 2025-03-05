import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { Subdivision } from '../models/subdivision';
import { Product, ProductResponse } from '../models/Product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '../services/dialog.service';
import { MydialogComponent } from '../mydialog/mydialog.component';
import { SubdivisonService } from '../services/subdivison.service';


@Component({
  selector: 'app-subdivision-data-display',
  templateUrl: './subdivision-data-display.component.html',
  styleUrls: ['./subdivision-data-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class SubdivisionDataDisplayComponent implements OnInit {

  @Input('items') products!: Product[];
  @Input('total') totalDivisions!: number;

  @Output('onscroll') onScrollEvent = new EventEmitter();
  scrollDistance: number = 1; // How far from the bottom to trigger scroll
  scrollUpDistance: number = 2; // How far from the top to trigger scroll
  scrollThrottle: number = 300; // Time in ms to throttle scroll events

  constructor(private _snackBar: MatSnackBar, private dialogService: DialogService, private subdivisonService: SubdivisonService) {

  }

  ngOnInit(): void {
    // console.log('Total', this.totalDivisions);
    this.onScroll();
  }


  onScroll() {
    if (this.products.length >= this.totalDivisions) {
      console.log('No more items');
      return;
    }
    console.log('on scroll!');
    this.onScrollEvent.emit();
  }
  addToCart(product: Product) {
    const uInfo: any = sessionStorage.getItem('user_info');
    const user_info = JSON.parse(uInfo);
    if(user_info && Object.keys(user_info).length !== 0) {
      this.subdivisonService.addToCart({user_id: user_info.user_id,product_id: product.product_id, quantity: 1 }).subscribe({
        next: (response) => {
          this._snackBar.open('added to cart success','', {
            duration: 1000,
            announcementMessage: 'added to cart success',
            panelClass: ['blue-snackbar'],
            verticalPosition: 'top'
          });
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    } else {
      this.dialogService.openDialog(MydialogComponent, { message: 'Hello from dynamic dialog!' })
      .subscribe(result => {
        console.log('Dialog was closed', result);
      });
    }
  }
}
