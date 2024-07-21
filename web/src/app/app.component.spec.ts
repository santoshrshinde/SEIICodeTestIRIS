import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SubdivisonService } from './services/subdivison.service';
import { environment } from 'src/environments/environment';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [SubdivisonService],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'web'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('web');
  });

  it(`should have filter initial object `, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.filterObj).toEqual({
      start : 0,
      limit : environment.pageLimit,
      filter: '',
      sortorder: '',
      sortby: '',
    });
  });
});
