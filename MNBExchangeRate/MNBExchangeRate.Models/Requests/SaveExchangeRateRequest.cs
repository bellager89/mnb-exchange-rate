using System.ComponentModel.DataAnnotations;

namespace MNBExchangeRate.Dtos.Requests
{
    public class SaveExchangeRateRequest
    {
        [Required]
        public string Currency { get; set; }
        [Required]
        public double Rate { get; set; }

        public string Comment { get; set; }
    }
}
