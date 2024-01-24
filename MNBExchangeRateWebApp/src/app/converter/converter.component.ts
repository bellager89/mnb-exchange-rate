import { Component, ElementRef, ViewChild } from '@angular/core';
import { ExchangeRateService } from '../clients';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css'
})
export class ConverterComponent {
  @ViewChild('hufInput') input!:ElementRef; 
  
  hufValue: number | undefined;
  eurValue: number | undefined;

  constructor(private service: ExchangeRateService) {}

  ngOnInit(): void {}

  calculateExchangeRate(): void {
    this.hufValue = this.input.nativeElement.value;

    if (this.hufValue !== undefined && this.hufValue > 0) {
      this.service.exchangeRateExchangeHufToEurGet(this.hufValue).subscribe(
        (eurValue) => {
          this.eurValue = eurValue;
        }
      );
    }
  }
}
