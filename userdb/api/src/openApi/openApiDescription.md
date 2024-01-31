A simple API simulating a very basic user administration service

## Authentication and authorization

In order to call protected endpoints you need a valid session token. These tokens are issued by the login endpoint. Provide a valid username and password combination to it and it will return a valid session token. Users with the admin role are automatically granted all other roles as well.

**Important**: Tokens expire after 30 minutes.

The service starts with a single admin user:

- Username: `admin`
- Password: `admin`

### Roles

Each user can be assigned a role. The "admin" role grants access to all endpoints regardless of the role required. There are currently 4 roles in the system:

- Admin: This role grants access to all endpoints and actions.
- UserAdmin: Allows managing users and group memberships for non-admin users, but cannot create or change groups themselves.
- User: A single user can view themselves, all users and all groups in the system, but cannot change anything except their own information.
- Guest: A single user can view themselves and their own memberships and direct groups, but cannot see other users or their memeberships.
