import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCandidates } from './my-candidates';

describe('MyCandidates', () => {
  let component: MyCandidates;
  let fixture: ComponentFixture<MyCandidates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCandidates]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCandidates);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
