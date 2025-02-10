import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBySubdivisionComponent } from './group-by-subdivision.component';

describe('GroupBySubdivisionComponent', () => {
  let component: GroupBySubdivisionComponent;
  let fixture: ComponentFixture<GroupBySubdivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupBySubdivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupBySubdivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
