import { Component, OnInit } from '@angular/core';
import { ExchangeRateModel, ExchangeRateService } from '../clients';
import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SaveDialogComponent } from '../save-dialog/save-dialog.component';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrl: './exchange-rates.component.css'
})
export class ExchangeRatesComponent implements OnInit {
  exchangeRates: ExchangeRateModel[] = [];
  day: Date = new Date();
  displayedColumns: string[] = ['currency', 'rate', 'actions'];

  constructor(private service: ExchangeRateService, private currencyPipe: CurrencyPipe, private dialog: MatDialog, private toastService: ToastService){
  }

  ngOnInit(){
    this.service.exchangeRateGetCurrentExchangeRatesGet().subscribe((result) => {
        this.exchangeRates = result.rates ?? [];
        this.day = result.day ?? new Date()
    });
  }

  formatCurrency(value: number, currencyCode: string): string {
    return this.currencyPipe.transform(value, currencyCode) ?? '';
  }
  openSaveDialog(element: ExchangeRateModel): void {
    this.dialog.open(SaveDialogComponent, {
      width: '500px',
      data: { saveCallback: this.saveData.bind(this, element) }
    });
  }

  saveData(element: ExchangeRateModel, comment: string): void {
    var message = this.service.exchangeRatePost({currency: element.currency, rate: element.rate, comment});
    message.subscribe((result) => {
      this.toastService.open(`${element.currency} is saved successfully! with Id: ${result}`);
    });
  }
}
