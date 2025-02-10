import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SubdivisonService } from './services/subdivison.service';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let myHttpServiceSpy: jasmine.SpyObj<SubdivisonService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SubdivisonService', ['getSubdivisions']);
    await TestBed.configureTestingModule({
      imports: [
        //  ,
        HttpClientTestingModule
      ],
      // providers: [{ provide: SubdivisonService, useValue: spy }],
      providers: [SubdivisonService],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    myHttpServiceSpy = TestBed.inject(SubdivisonService) as jasmine.SpyObj<SubdivisonService>;
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
      start: 0,
      limit: environment.pageLimit,
      filter: '',
      sortorder: '',
      sortby: '',
    });
  });


  it('should make first http request using getSubdivisions function', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    spyOn(component, 'getSubdivisions');
    component.filterObj = {
      start: 0,
      limit: environment.pageLimit,
      filter: '',
      sortorder: '',
      sortby: '',
    };
    component.getSubdivisions();
    fixture.detectChanges();
    expect(component.subdivisionsResponse.subdivisions.length).toBe(0);
  });

  /* it('should display fetched data', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    let mockResponse = {
      totalRecords: 335,
      subdivisions: [
        {
          id: 102757,
          code: "143C2",
          name: "Acacia Landing Manor",
          longitude: -115.31868,
          latitude: 36.256919,
          fieldSurveyTerritoryId: 1654,
          marketId: 16,
          subdivisionStatusId: 3,
          surveyMethodId: 2,
          activeSections: 1,
          futureSections: 0,
          builtOutSections: 1,
          totalLots: 0,
          fieldSurveyTerritoryName: "Lone MT",
          marketName: "Las Vegas",
          marketAbbreviation: "LV",
          subdivisionStatusCode: "Active",
          surveyMethodCode: "DRIVE",
          county: "Clark",
          community: '',
          zoom17Date: "2023-08-13T18:50:58.000Z",
          zoom18Date: "2023-08-13T18:50:58.000Z",
          subdivisionGeometryId: null,
          subdivisionGeometryBoundingBoxId: null,
          subdivisionGeometryBoundaryId: null,
          subdivisionGeometryIntelligenceBoundaryId: 85515,
          subdivisionGeometryIntelligenceBoundaryStatusId: 4,
          subdivisionGeometryIntelligenceBoundaryStatusCode: "Finalized",
          subdivisionGeometryIntelligenceBoundaryStatusChangeDate: "2022-07-13T20:20:27.923Z",
          nearMapImageDate: "2023-06-17T18:02:42.000Z",
          imageBoxId: 82566,
          mostRecentIPointBatchDate: "2023-07-06T00:00:00.000Z",
          iPoints: null,
          validatediPoints: null,
          subdivisionSpecificStatus: "Act 4Q21"
        }
      ]
    };
    const start = 0;
    const limit = 0;
    const filter = 'Active';
    const sortby = 'name';
    const sortorder = 'asc';

    fixture.detectChanges();
    myHttpServiceSpy.getSubdivisions.and.returnValue(of(mockResponse));
    fixture.detectChanges();

    expect(myHttpServiceSpy.getSubdivisions).toHaveBeenCalledWith(start, limit, filter, sortorder, sortby);
    console.log('component.subdivisionsResponse', component.subdivisionsResponse);
    expect(component.subdivisionsResponse).toEqual(mockResponse);

  }); */

});
