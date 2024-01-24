using Microsoft.EntityFrameworkCore;
using MNBExchangeRate.DataAccess.Entities;

namespace MNBExchangeRate.DataAccess
{
    public class MNBDbContext : DbContext
    {
        public MNBDbContext(DbContextOptions<MNBDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<ExchangeRate> ExchangeRates { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<ExchangeRate>().ToTable("ExchangeRates").HasKey(x => x.Id);
            modelBuilder.Entity<ExchangeRate>().Property(x => x.Comment).HasMaxLength(100);
        }
    }
}