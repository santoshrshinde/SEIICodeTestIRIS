import { TestBed } from '@angular/core/testing';

import { SubdivisonService } from './subdivison.service';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('SubdivisonService', () => {
  let service: SubdivisonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [SubdivisonService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubdivisonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getData function', () => {
    const service: SubdivisonService = TestBed.get(SubdivisonService);
    expect(service.getSubdivisions(0, 1, '', '', '')).toBeTruthy();
   });

   it('should fetch data successfully', () => {
    const dummyData = [
        {
            "id": 26951,
            "code": "001B3",
            "name": "Alexander Park",
            "longitude": -115.07067,
            "latitude": 36.233263,
            "fieldSurveyTerritoryId": 3782,
            "marketId": 16,
            "subdivisionStatusId": 2,
            "surveyMethodId": 2,
            "activeSections": 0,
            "futureSections": 1,
            "builtOutSections": 2,
            "totalLots": 237,
            "fieldSurveyTerritoryName": "EldorBI",
            "marketName": "Las Vegas",
            "marketAbbreviation": "LV",
            "subdivisionStatusCode": "Future",
            "surveyMethodCode": "DRIVE",
            "county": "Clark",
            "community": null,
            "zoom17Date": "2023-08-11T18:20:25.557Z",
            "zoom18Date": "2023-08-11T18:20:25.557Z",
            "subdivisionGeometryId": null,
            "subdivisionGeometryBoundingBoxId": null,
            "subdivisionGeometryBoundaryId": null,
            "subdivisionGeometryIntelligenceBoundaryId": 24714,
            "subdivisionGeometryIntelligenceBoundaryStatusId": 4,
            "subdivisionGeometryIntelligenceBoundaryStatusCode": "Finalized",
            "subdivisionGeometryIntelligenceBoundaryStatusChangeDate": "2022-07-14T04:41:38.403Z",
            "nearMapImageDate": "2023-06-17T18:02:42.000Z",
            "imageBoxId": 59809,
            "mostRecentIPointBatchDate": "2023-07-07T00:00:00.000Z",
            "iPoints": null,
            "validatediPoints": null,
            "subdivisionSpecificStatus": "Future"
        }
    ];
    // const service: SubdivisonService = TestBed.get(SubdivisonService);
    service.getSubdivisions(0, 30, '', '', '').subscribe((data: any) => {
      expect(data.length).toBe(1);
      expect(data).toEqual(dummyData);
    });

    // const req = httpMock.expectOne('GET', 'http://localhost:3000/v1/subdivisions?start=0&limit=1&sortorder=&sortby=&filter=.');
    const req = httpMock.expectOne(service['apiUrl'], '');
    expect(req.request.method).toBe('GET');
    console.log('Request',req);
    req.flush(dummyData);
  });
});
