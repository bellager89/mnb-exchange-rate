Backend (MNBExchangeRate):
MNBExchangeRate\MNBExchangeRate.WebApi\appsettings.json
 - Set your connectionString ConnectionStrings -> DefaultConnection
 - ValidAudience -> WebApp address
 - ValidIssuer -> WebApi address

After that you can start WebApi project, the database will be auto migrated.

Frontend (MNBExchangeRateWebApp):
Just simply run: npm run start
