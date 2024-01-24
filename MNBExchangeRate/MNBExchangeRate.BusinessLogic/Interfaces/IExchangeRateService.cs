using MNBExchangeRate.Dtos.Requests;
using MNBExchangeRate.Dtos.Responses;

namespace MNBExchangeRate.BusinessLogic.Interfaces
{
    public interface IExchangeRateService
    {
        Task<CurrentExchangeRatesResponse> GetCurrentExchangeRates();
        Task<int> SaveExchangeRate(SaveExchangeRateRequest request);
        Task<SavedExchangeRateResponse> ModifyExchangeRate(ModifyExchangeRateRequest request);
        Task DeleteExchangeRate(int id);
        Task<IEnumerable<SavedExchangeRateResponse>> GetSavedExchangeRates();
        Task<double> ExchangeHufToEur(double amount);
        Task<SavedExchangeRateResponse> GetSavedExchangeRate(int id);
    }
}
