import { Navigate, Outlet, RouteObject, createBrowserRouter } from "react-router-dom"

import { Header, MainLayout } from "@react-workshop/ui"
import { RequireRoles } from "@react-workshop/userdb-libs-auth"

import { MainMenu } from "./MainMenu"
import { ActiveSessionsPage } from "./pages/ActiveSessionsPage"
import { ApiStatusPage } from "./pages/ApiStatusPage"
import { ErrorPage } from "./pages/ErrorPage"
import { FieldsPage } from "./pages/FieldsPage"
import { HomePage } from "./pages/HomePage"
import { OptimizationPage } from "./pages/OptimizationPage"
import { StaticGroupsPage } from "./pages/StaticGroupsPage"
import { GroupDetailsPage } from "./pages/groups/GroupDetailsPage"
import { GroupsPage } from "./pages/groups/GroupsPage"
import { AuthServiceLoginPage, BasicLoginPage, DataServiceLoginPage } from "./pages/login"
import { EditUserPage } from "./pages/users/EditUserPage"
import { UserDetailsPage } from "./pages/users/UserDetailsPage"
import { UsersPage } from "./pages/users/UsersPage"

const appRoutes: RouteObject[] = [
	{
		index: true,
		element: <HomePage />
	},
	{
		path: "login",
		children: [
			{
				path: "basic",
				children: [
					{
						index: true,
						element: <BasicLoginPage />
					}
				]
			},
			{
				path: "data-service",
				children: [
					{
						index: true,
						element: <DataServiceLoginPage />
					}
				]
			},
			{
				path: "auth-service",
				children: [
					{
						index: true,
						element: <AuthServiceLoginPage />
					}
				]
			}
		]
	},
	{
		path: "users",
		element: (
			<RequireRoles onMissingRoles={<Navigate to="/" />}>
				<Outlet />
			</RequireRoles>
		),
		children: [
			{
				index: true,
				element: <UsersPage />
			},
			{
				path: ":userId",
				children: [
					{
						index: true,
						element: <UserDetailsPage />
					},
					{
						path: "edit",
						element: <EditUserPage />
					}
				]
			}
		]
	},
	{
		path: "groups",
		element: (
			<RequireRoles onMissingRoles={<Navigate to="/" />}>
				<Outlet />
			</RequireRoles>
		),
		children: [
			{
				index: true,
				element: <GroupsPage />
			},
			{
				path: ":groupId",
				element: <GroupDetailsPage />
			}
		]
	},
	{
		path: "users-static",
		element: (
			<RequireRoles roles={["User", "UserAdmin"]} onMissingRoles={<Navigate to="/" />}>
				<Outlet />
			</RequireRoles>
		),
		children: [
			{
				index: true,
				lazy: async () => {
					const { StaticUsersPage } = await import("./pages/StaticUsersPage")
					return { Component: StaticUsersPage }
				}
			},
			{
				path: ":userId",
				lazy: async () => {
					const { StaticUsersPage } = await import("./pages/StaticUsersPage")
					return { Component: StaticUsersPage }
				}
			}
		]
	},
	{
		path: "groups-static",
		element: (
			<RequireRoles onMissingRoles={<Navigate to="/" />}>
				<Outlet />
			</RequireRoles>
		),
		children: [
			{
				index: true,
				element: <StaticGroupsPage />
			}
		]
	},
	{
		path: "status",
		element: (
			<RequireRoles roles={["Admin"]} onMissingRoles={<Navigate to="/" />}>
				<ApiStatusPage />
			</RequireRoles>
		)
	},
	{
		path: "sessions",
		element: (
			<RequireRoles roles={["Admin"]} onMissingRoles={<Navigate to="/" />}>
				<ActiveSessionsPage />
			</RequireRoles>
		)
	},
	{
		path: "optimization",
		element: <OptimizationPage />
	},
	{
		path: "fields",
		element: <FieldsPage />
	}
]

export const router = createBrowserRouter([
	{
		element: <MainLayout header={<Header />} menu={<MainMenu />} />,
		errorElement: (
			<MainLayout header={<Header />} menu={<MainMenu />}>
				<ErrorPage />
			</MainLayout>
		),
		children: [...appRoutes]
	}
])
