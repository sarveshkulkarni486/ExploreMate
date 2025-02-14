public class Admin
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Role { get; set; }

    // Parameterless constructor (default)
    public Admin() { }

    // Existing constructor with required parameters (if you want to use it)
    public Admin(string username, string email, string passwordHash, string confirmPassword, string role)
    {
        Username = username;
        Email = email;
        PasswordHash = passwordHash;
        Role = role;
        // No need to handle ConfirmPassword here, it's for validation purposes only
    }
}
