using MNBExchangeRate.Dtos.Requests;

namespace MNBExchangeRate.BusinessLogic.Interfaces
{
    public interface IAuthenticationService
    {
        Task<string> Register(RegisterRequest request);
        Task<string> Login(LoginRequest request);
    }
}
