import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subdivision } from '../models/subdivision';
import { Product, ProductResponse } from '../models/Product';

@Component({
  selector: 'app-subdivision-data-display',
  templateUrl: './subdivision-data-display.component.html',
  styleUrls: ['./subdivision-data-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubdivisionDataDisplayComponent implements OnInit {

  @Input('items') products!: Product[];
  @Input('total') totalDivisions!: number;

  @Output('onscroll') onScrollEvent = new EventEmitter();
  scrollDistance: number = 1; // How far from the bottom to trigger scroll
  scrollUpDistance: number = 2; // How far from the top to trigger scroll
  scrollThrottle: number = 300; // Time in ms to throttle scroll events

  constructor() {

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
}
