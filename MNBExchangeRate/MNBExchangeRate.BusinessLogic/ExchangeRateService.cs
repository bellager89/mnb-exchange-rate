using Microsoft.EntityFrameworkCore;
using MNBExchangeRate.BusinessLogic.Interfaces;
using MNBExchangeRate.DataAccess;
using MNBExchangeRate.DataAccess.Entities;
using MNBExchangeRate.Dtos.Requests;
using MNBExchangeRate.Dtos.Responses;
using MNBExchangeRate.Services.Interfaces;

namespace MNBExchangeRate.BusinessLogic
{
    public class ExchangeRateService : IExchangeRateService
    {
        private readonly IMNBService _mnbService;
        private readonly IDbContextFactory<MNBDbContext> _contextFactory;
        public ExchangeRateService(IMNBService mnbService, IDbContextFactory<MNBDbContext> contextFactory)
        {
            _mnbService = mnbService;
            _contextFactory = contextFactory;
        }

        public async Task<CurrentExchangeRatesResponse> GetCurrentExchangeRates()
        {
            var exchangeRates = await _mnbService.GetCurrentExchangeRates();

            var response = new CurrentExchangeRatesResponse
            {
                Day = exchangeRates.Day.Date,
                Rates = exchangeRates.Day.Rate.Select(r => new ExchangeRateModel
                {
                    Currency = r.Curr,
                    Rate = double.Parse(r.Text)
                })
            };

            return response;
        }

        public async Task<int> SaveExchangeRate(SaveExchangeRateRequest request)
        {
            using var context = await _contextFactory.CreateDbContextAsync();

            var exchangeRate = new ExchangeRate
            {
                Currency = request.Currency,
                Rate = request.Rate,
                CreatedOn = DateTime.UtcNow,
                Comment = request.Comment
            };

            context.ExchangeRates.Add(exchangeRate);
            await context.SaveChangesAsync();
            return exchangeRate.Id;
        }

        public async Task<SavedExchangeRateResponse> ModifyExchangeRate(ModifyExchangeRateRequest request)
        {
            using var context = await _contextFactory.CreateDbContextAsync();

            var exchangeRate = await context.ExchangeRates.FirstOrDefaultAsync(er => er.Id == request.Id);

            if (exchangeRate is null)
            {
                throw new Exception("Exchange rate not found!");
            }

            exchangeRate.Comment = request.Comment;
            await context.SaveChangesAsync();

            return new SavedExchangeRateResponse
            {
                Id = exchangeRate.Id,
                Currency = exchangeRate.Currency,
                Rate = exchangeRate.Rate,
                CreatedOn = exchangeRate.CreatedOn,
                Comment = exchangeRate.Comment
            };
        }

        public async Task DeleteExchangeRate(int id)
        {
            using var context = await _contextFactory.CreateDbContextAsync();

            var exchangeRate = await context.ExchangeRates.FirstOrDefaultAsync(er => er.Id == id);

            if (exchangeRate is null)
            {
                throw new Exception("Exchange rate not found!");
            }

            context.ExchangeRates.Remove(exchangeRate);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<SavedExchangeRateResponse>> GetSavedExchangeRates()
        {
            using var context = await _contextFactory.CreateDbContextAsync();

            return await context.ExchangeRates.Select(er => new SavedExchangeRateResponse
            {
                Id = er.Id,
                Currency = er.Currency,
                Rate = er.Rate,
                CreatedOn = er.CreatedOn,
                Comment = er.Comment
            }).ToListAsync();
        }

        public async Task<double> ExchangeHufToEur(double amount)
        {
            var eurRate = await _mnbService.GetCurrentEurRate();

            return amount / eurRate;
        }

        public async Task<SavedExchangeRateResponse> GetSavedExchangeRate(int id)
        {
            using var context = await _contextFactory.CreateDbContextAsync();

            return await context.ExchangeRates.Select(er => new SavedExchangeRateResponse
            {
                Id = er.Id,
                Currency = er.Currency,
                Rate = er.Rate,
                CreatedOn = er.CreatedOn,
                Comment = er.Comment
            }).FirstOrDefaultAsync(er => er.Id == id);
        }
    }
}
