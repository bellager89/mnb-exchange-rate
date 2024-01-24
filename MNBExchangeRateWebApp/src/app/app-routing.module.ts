import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SavedExchangeRatesComponent } from './saved-exchange-rates/saved-exchange-rates.component';
import { ConverterComponent } from './converter/converter.component';

const routes: Routes = [
  {
    path: '',
    component: ExchangeRatesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'saved',
    component: SavedExchangeRatesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'converter',
    component: ConverterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
