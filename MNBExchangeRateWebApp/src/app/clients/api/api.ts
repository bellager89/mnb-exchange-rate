export * from './exchangeRate.service';
import { ExchangeRateService } from './exchangeRate.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [ExchangeRateService, UserService];
