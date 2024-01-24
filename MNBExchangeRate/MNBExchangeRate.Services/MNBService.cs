using Microsoft.Extensions.Configuration;
using MNBExchangeRate.Dtos;
using MNBExchangeRate.Services.Interfaces;
using MNBExchangeRate.Services.MNB;
using System.Xml.Serialization;

namespace MNBExchangeRate.Services
{
    public class MNBService : IMNBService
    {
        private readonly IConfiguration _configuration;

        public MNBService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<MNBCurrentExchangeRates> GetCurrentExchangeRates()
        {
            using var client = new MNBArfolyamServiceSoapClient();
            var response = await client.GetCurrentExchangeRatesAsync(new GetCurrentExchangeRatesRequest());

            var serializer = new XmlSerializer(typeof(MNBCurrentExchangeRates));
            using var reader = new StringReader(response.GetCurrentExchangeRatesResponse1.GetCurrentExchangeRatesResult);
            var result = (MNBCurrentExchangeRates)serializer.Deserialize(reader);

            return result;
        }

        public async Task<double> GetCurrentEurRate()
        {
            var rates = await GetCurrentExchangeRates();

            var eurCurrency = _configuration["EurCurrency"];

            if (double.TryParse(rates.Day.Rate.FirstOrDefault(r => r.Curr == eurCurrency).Text, out double result))
            {
                return result;
            }

            throw new Exception("EUR exchange rate not avalaible now, try again later!");
        }
    }
}
