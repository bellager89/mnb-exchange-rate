import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './helpers/token.interceptor';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ExchangeRateService, UserService } from './clients';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { SaveDialogComponent } from './save-dialog/save-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastService } from './services/toast.service';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { SavedExchangeRatesComponent } from './saved-exchange-rates/saved-exchange-rates.component';
import { ConverterComponent } from './converter/converter.component';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeRatesComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HeaderComponent,
    SaveDialogComponent,
    SavedExchangeRatesComponent,
    ConverterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor, 
      multi: true 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }, 
    UserService, 
    ExchangeRateService, 
    provideAnimations(),
    CurrencyPipe, 
    ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
