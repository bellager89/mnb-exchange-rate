using MNBExchangeRate.Dtos;

namespace MNBExchangeRate.Services.Interfaces
{
    public interface IMNBService
    {
        Task<double> GetCurrentEurRate();
        Task<MNBCurrentExchangeRates> GetCurrentExchangeRates();
    }
}
