import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeadcrumbsComponent } from './beadcrumbs.component';

describe('BeadcrumbsComponent', () => {
  let component: BeadcrumbsComponent;
  let fixture: ComponentFixture<BeadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeadcrumbsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
