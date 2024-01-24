namespace MNBExchangeRate.Dtos.Responses
{
    public class CurrentExchangeRatesResponse
    {
        public DateTime Day { get; set; }
        public IEnumerable<ExchangeRateModel> Rates { get; set; }
    }

    public class ExchangeRateModel
    {
        public string Currency { get; set; }
        public double Rate { get; set; }
    }
}
