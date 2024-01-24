namespace MNBExchangeRate.Dtos.Responses
{
    public class SavedExchangeRateResponse
    {
        public int Id { get; set; }
        public string Currency { get; set; }
        public double Rate { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Comment { get; set; }
    }
}
