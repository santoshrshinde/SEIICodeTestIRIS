import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule
      ],
      declarations: [FilterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find the filter select element', () => {
    fixture.detectChanges();
    const selectElement = fixture.debugElement.query(By.css('mat-select[name="filter"]'));
    expect(selectElement).toBeTruthy();
    expect(selectElement.nativeElement).toBeTruthy();
  });

  it('should find the sortorder select element', () => {
    fixture.detectChanges();
    const selectElement = fixture.debugElement.query(By.css('mat-select[name="sortorder"]'));
    expect(selectElement).toBeTruthy();
    expect(selectElement.nativeElement).toBeTruthy();
  });

  it('should find the sortby select element', () => {
    fixture.detectChanges();
    const selectElement = fixture.debugElement.query(By.css('mat-select[name="sortby"]'));
    expect(selectElement).toBeTruthy();
    expect(selectElement.nativeElement).toBeTruthy();
  });

  it('after selecting active filter option  filter objects filter key value should changed to Active when the form is submitted', () => {
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const selectElement = fixture.debugElement.query(By.css('#filter')).nativeElement;
    selectElement.click();
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('mat-option'));
    options[1].nativeElement.click();
    fixture.detectChanges();

    expect(component.filterObj).toEqual({start: 0,limit: 0,filter: 'Active',sortorder: '',sortby: ''});
  });


  it('should change filter dropdown value to Active', () => {
    spyOn(component, 'filterData');
    const selectElement = fixture.debugElement.query(By.css('#filter')).nativeElement;
    selectElement.click();
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('mat-option'));
    options[1].nativeElement.click();
    fixture.detectChanges();
    expect(component.filterObj.filter).toBe('Active');
  });

  it('should change sortorder dropdown value to asc(ascending)', () => {
    spyOn(component, 'filterData');
    const selectElement = fixture.debugElement.query(By.css('#sortorder')).nativeElement;
    selectElement.click();
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('mat-option'));
    options[1].nativeElement.click();
    fixture.detectChanges();
    expect(component.filterObj.sortorder).toBe('asc');
  });

  it('should change sortby dropdown value to name', () => {
    spyOn(component, 'filterData');
    const selectElement = fixture.debugElement.query(By.css('#sortby')).nativeElement;
    selectElement.click();
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('mat-option'));
    options[1].nativeElement.click();
    fixture.detectChanges();
    expect(component.filterObj.sortby).toBe('name');
  });

  it('should reset filter data to default', () => {
    spyOn(component, 'clear');
    const clearBtn = fixture.debugElement.query(By.css("button#clear"));
    component.filterObj = {
      start : 0,
      limit : environment.pageLimit,
      filter: '',
      sortorder: '',
      sortby: '',
    };
    clearBtn.nativeElement.click();
    fixture.detectChanges();
    expect(component.filterObj).toEqual({
      start : 0,
      limit : environment.pageLimit,
      filter: '',
      sortorder: '',
      sortby: '',
    });
  });

});
