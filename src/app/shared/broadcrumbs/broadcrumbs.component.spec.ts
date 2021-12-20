import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcrumbsComponent } from './broadcrumbs.component';

describe('BroadcrumbsComponent', () => {
  let component: BroadcrumbsComponent;
  let fixture: ComponentFixture<BroadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcrumbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
