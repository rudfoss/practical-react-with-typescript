A simple API simulating a very basic user administration service

## Authentication

In order to call protected endpoints you need a valid session token. These tokens are issued by the `auth/login` endpoint. Provide a valid username and password combination to it and it will return a valid session with a token. This token must then be passed in the `Authorization` header.

```
Authorization: Bearer [token]
```

In the Swagger UI you can perform authenticated requests by using the `login` endpoint to get a token and then copying that token to the Authorize dialog.

**Important**: Tokens expire after 30 minutes, but can be renewed using the `auth/session` endpoint.

The service starts with a single admin user:

- Username: `admin`
- Password: `admin`

## Authorization

Each user can be assigned a role. The "admin" role grants access to all endpoints regardless of the role required. These roles are available:

- Admin: This role grants access to all endpoints and actions. Since the admin role has full access it is not listed as a possible role for protected endpoints unless it is the only role required.
- UserAdmin: Allows managing users and group memberships for non-admin users, but cannot create or change groups themselves.
- User: A single user can view themselves, all users and all groups in the system, but cannot change anything except their own information.
- Guest: A single user can view themselves and their own memberships and direct groups, but cannot see other users or their memeberships.
