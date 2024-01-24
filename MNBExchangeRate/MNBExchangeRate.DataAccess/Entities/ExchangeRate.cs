namespace MNBExchangeRate.DataAccess.Entities
{
    public class ExchangeRate
    {
        public int Id { get; set; }
        public string Currency { get; set; }
        public double Rate { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Comment { get; set; }
    }
}
