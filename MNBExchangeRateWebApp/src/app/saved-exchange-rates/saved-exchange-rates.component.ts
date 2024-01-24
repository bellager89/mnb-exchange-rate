import { Component, OnInit } from '@angular/core';
import { ExchangeRateService, SavedExchangeRateResponse } from '../clients';
import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SaveDialogComponent } from '../save-dialog/save-dialog.component';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-saved-exchange-rates',
  templateUrl: './saved-exchange-rates.component.html',
  styleUrl: './saved-exchange-rates.component.css'
})
export class SavedExchangeRatesComponent implements OnInit {
  exchangeRates: SavedExchangeRateResponse[] = [];
  day: Date = new Date();
  displayedColumns: string[] = ['currency', 'rate', 'comment', 'createdOn', 'actions'];

  constructor(private service: ExchangeRateService, private currencyPipe: CurrencyPipe, private dialog: MatDialog, private toastService: ToastService){
  }

  ngOnInit(){
    this.refreshSavedExchangeRates();
  }

  private refreshSavedExchangeRates() {
    this.service.exchangeRateGetSavedExchangeRatesGet().subscribe((result) => {
      this.exchangeRates = result ?? [];
    });
  }

  formatCurrency(value: number, currencyCode: string): string {
    return this.currencyPipe.transform(value, currencyCode) ?? '';
  }

  delete(element: SavedExchangeRateResponse): void{
    var message = this.service.exchangeRateDelete(element.id)
    message.subscribe(() => {
      this.toastService.open(`${element.currency} is deleted successfully!`);
      this.refreshSavedExchangeRates();
    });
  }

  openModifyDialog(element: SavedExchangeRateResponse): void {
    this.dialog.open(SaveDialogComponent, {
      width: '500px',
      data: { comment: element.comment, saveCallback: this.saveData.bind(this, element) }
    });
  }

  saveData(element: SavedExchangeRateResponse, comment: string): void {
    var message = this.service.exchangeRatePut({id: element.id, comment});
    message.subscribe(() => {
      this.toastService.open(`${element.currency} comment is saved successfully!`);
      this.refreshSavedExchangeRates();
    });
  }
}
