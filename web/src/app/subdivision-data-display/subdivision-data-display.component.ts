import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { Subdivision } from '../models/subdivision';
import { Product, ProductResponse } from '../models/Product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '../services/dialog.service';
import { MydialogComponent } from '../mydialog/mydialog.component';


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

  constructor(private _snackBar: MatSnackBar, private dialogService: DialogService) {

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
    // user_id, product_id, quantity
    console.log(product);
   /*  this._snackBar.open('added to cart success','', {
      // duration: 2000,
      announcementMessage: 'added to cart success',
      panelClass: ['blue-snackbar'],
      // verticalPosition: 'top'
    }); */
    this.dialogService.openDialog(MydialogComponent, { message: 'Hello from dynamic dialog!' })
    .subscribe(result => {
      console.log('Dialog was closed', result);
    });
  }
}
