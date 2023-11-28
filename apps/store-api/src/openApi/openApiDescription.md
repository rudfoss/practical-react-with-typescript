# Store API

This API implements a simple store REST service. Data is stored in memory and reset on restarts.

## Authorization

In order to call protected endpoints you need a valid session token. These tokens are issued by the login endpoint. Provide a valid username and password combination to it and it will return a valid session token.

**Important**: Tokens expire after 30 minutes.
