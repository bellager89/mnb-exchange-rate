import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedExchangeRatesComponent } from './saved-exchange-rates.component';

describe('ExchangeRatesComponent', () => {
  let component: SavedExchangeRatesComponent;
  let fixture: ComponentFixture<SavedExchangeRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedExchangeRatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedExchangeRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
