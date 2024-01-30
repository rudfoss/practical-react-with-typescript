export enum UserDbRole {
	Admin = "Admin", // Allows full access to the system.
	UserAdmin = "UserAdmin", // Allows management of users that are not administrators.
	User = "User", // Grants read-access to users and groups.
	Guest = "Guest" // Grants read access only to the user and their respective group memberships.
}
