using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MNBExchangeRate.BusinessLogic.Interfaces;
using MNBExchangeRate.Dtos.Requests;
using MNBExchangeRate.Dtos.Responses;

namespace MNBExchangeRate.WebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class ExchangeRateController : ControllerBase
    {
        private readonly ILogger<ExchangeRateController> _logger;
        private readonly IExchangeRateService _exchangeRateService;

        public ExchangeRateController(ILogger<ExchangeRateController> logger, IExchangeRateService exchangeRateService)
        {
            _logger = logger;
            _exchangeRateService = exchangeRateService;
        }

        [HttpGet(nameof(GetCurrentExchangeRates))]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CurrentExchangeRatesResponse))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCurrentExchangeRates()
        {
            return Ok(await _exchangeRateService.GetCurrentExchangeRates());
        }

        [HttpGet(nameof(GetSavedExchangeRates))]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<SavedExchangeRateResponse>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetSavedExchangeRates()
        {
            return Ok(await _exchangeRateService.GetSavedExchangeRates());
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(int))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SaveExchangeRate(SaveExchangeRateRequest request)
        {
            if (request is null)
            {
                return BadRequest();
            }

            return Ok(await _exchangeRateService.SaveExchangeRate(request));
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SavedExchangeRateResponse))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ModifyExchangeRate(ModifyExchangeRateRequest request)
        {
            if (request is null)
            {
                return BadRequest();
            }

            return Ok(await _exchangeRateService.ModifyExchangeRate(request));
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SavedExchangeRateResponse))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetSavedExchangeRate(int id)
        {
            return Ok(await _exchangeRateService.GetSavedExchangeRate(id));
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetCurrentExchangeRates(int id)
        {
            await _exchangeRateService.DeleteExchangeRate(id);
            return Ok();
        }

        [HttpGet(nameof(ExchangeHufToEur))]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(double))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ExchangeHufToEur(double amount)
        {
            return Ok(await _exchangeRateService.ExchangeHufToEur(amount));
        }
    }
}