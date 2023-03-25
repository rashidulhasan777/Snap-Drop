import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAndSidebarComponent } from './nav-and-sidebar.component';

describe('NavAndSidebarComponent', () => {
  let component: NavAndSidebarComponent;
  let fixture: ComponentFixture<NavAndSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavAndSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavAndSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
