using AdminSignupApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net; // Make sure BCrypt is used for password hashing

namespace AdminSignupApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/auth/signup
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpRequest model)
        {
            // Check if the user already exists
            if (await _context.Admins.AnyAsync(u => u.Email == model.Email))
            {
                return BadRequest("Email is already in use.");
            }

            // Ensure password and confirm password match
            if (model.Password != model.ConfirmPassword)
            {
                return BadRequest("Passwords do not match.");
            }

            // Hash the password before saving
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

            // Create new Admin object
            var user = new Admin
            {
                Username = model.Username,
                Email = model.Email,
                PasswordHash = hashedPassword,  // Store hashed password
                Role = model.Role // Role can be defaulted or taken from the form
            };

            // Add user to the database and save
            _context.Admins.Add(user);
            await _context.SaveChangesAsync();

            // Return success message
            return Ok(new { message = "User created successfully!" });
        }
    }

    // Request body model for the sign-up
    public class SignUpRequest
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Role { get; set; } // Default 'admin'
    }
}
