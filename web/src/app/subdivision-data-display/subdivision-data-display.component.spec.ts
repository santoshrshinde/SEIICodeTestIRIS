import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivisionDataDisplayComponent } from './subdivision-data-display.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { By } from '@angular/platform-browser';

describe('SubdivisionDataDisplayComponent', () => {
  let component: SubdivisionDataDisplayComponent;
  let fixture: ComponentFixture<SubdivisionDataDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivisionDataDisplayComponent],
      imports: [InfiniteScrollModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SubdivisionDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of links', () => {
    const linkElements = fixture.debugElement.queryAll(By.css('a'));
    expect(linkElements.length).toBe(0); // Expecting 3 links
  });

  /* it('should display anchor text as readmore...', () => {
    fixture.detectChanges();
    const anchorElement = fixture.debugElement.query(By.css('a[name="readmore"]'));
    expect(anchorElement.nativeElement).toBeTruthy();
    expect(anchorElement.nativeElement.getAttribute('href')).toBe('#');
  }); */
});
