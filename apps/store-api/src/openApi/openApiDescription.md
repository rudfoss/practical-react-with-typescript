A simple API simulating a very basic store. Data stored in memory and reset on restart.

## Authorization

In order to call protected endpoints you need a valid session token. These tokens are issued by the login endpoint. Provide a valid username and password combination to it and it will return a valid session token. Users with the admin role are automatically granted all other roles as well.

**Important**: Tokens expire after 30 minutes.

The service starts with a single admin user:

- Username: `admin`
- Password: `admin`
