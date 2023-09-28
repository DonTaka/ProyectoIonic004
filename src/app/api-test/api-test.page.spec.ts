import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiTestPage } from './api-test.page';

describe('ApiTestPage', () => {
  let component: ApiTestPage;
  let fixture: ComponentFixture<ApiTestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApiTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
