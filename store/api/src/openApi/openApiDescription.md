A simple API simulating a very basic store. Data stored as a json file in the root of the project.

## Authentication and authorization

In order to call protected endpoints you need a valid session token. These tokens are issued by the login endpoint. Provide a valid username and password combination to it and it will return a valid session token. Users with the admin role are automatically granted all other roles as well.

**Important**: Tokens expire after 30 minutes.

The service starts with a single admin user:

- Username: `admin`
- Password: `admin`

### Roles

Each user can be assigned a role. The "admin" role grants access to all endpoints regardless of the role required. There are currently 3 roles in the system:

- Admin: This role grants access to all endpoints and actions.
- Store Manager: This role allows managing inventory and pricing of products.
- Customer: This role allows shopping and putting products in their shopping cart.
