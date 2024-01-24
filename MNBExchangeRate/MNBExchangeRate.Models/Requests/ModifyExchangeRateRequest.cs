using System.ComponentModel.DataAnnotations;

namespace MNBExchangeRate.Dtos.Requests
{
    public class ModifyExchangeRateRequest
    {
        [Required]
        public int Id { get; set; }

        public string Comment { get; set; }
    }
}
