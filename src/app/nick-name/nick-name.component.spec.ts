import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NickNameComponent } from './nick-name.component';

describe('NickNameComponent', () => {
  let component: NickNameComponent;
  let fixture: ComponentFixture<NickNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NickNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NickNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
