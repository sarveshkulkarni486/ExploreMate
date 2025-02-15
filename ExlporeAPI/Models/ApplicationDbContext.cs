using Microsoft.EntityFrameworkCore;

namespace AdminSignupApp.Models
{
        public class ApplicationDbContext : DbContext
        {
        public DbSet<Admin> Admins { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
            {
            }

             // Table for admin
        }
    }

