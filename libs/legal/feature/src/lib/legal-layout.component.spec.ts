import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalLayoutComponent } from './legal-layout.component';

describe('LegalLayoutComponent', () => {
  let component: LegalLayoutComponent;
  let fixture: ComponentFixture<LegalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
