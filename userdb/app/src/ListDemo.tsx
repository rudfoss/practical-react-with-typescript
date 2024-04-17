import { TextField } from "./TextField"

const dummyData = [
	{
		id: 1,
		first_name: "Lucia",
		last_name: "Yeudall",
		email: "lyeudall0@census.gov",
		gender: "Female",
		ip_address: "85.176.150.199"
	},
	{
		id: 2,
		first_name: "Merry",
		last_name: "Manders",
		email: "mmanders1@ameblo.jp",
		gender: "Male",
		ip_address: "184.9.71.65"
	},
	{
		id: 3,
		first_name: "Von",
		last_name: "Cogswell",
		email: "vcogswell2@blogspot.com",
		gender: "Agender",
		ip_address: "254.246.158.75"
	},
	{
		id: 4,
		first_name: "Elvera",
		last_name: "Pittendreigh",
		email: "epittendreigh3@psu.edu",
		gender: "Female",
		ip_address: "160.51.114.255"
	},
	{
		id: 5,
		first_name: "Jameson",
		last_name: "Walewski",
		email: "jwalewski4@time.com",
		gender: "Male",
		ip_address: "203.90.80.57"
	},
	{
		id: 6,
		first_name: "Lorenzo",
		last_name: "Loche",
		email: "lloche5@artisteer.com",
		gender: "Male",
		ip_address: "251.250.249.229"
	},
	{
		id: 7,
		first_name: "Wilbert",
		last_name: "Fyall",
		email: "wfyall6@live.com",
		gender: "Male",
		ip_address: "167.69.157.211"
	},
	{
		id: 8,
		first_name: "Hank",
		last_name: "Manz",
		email: "hmanz7@dell.com",
		gender: "Male",
		ip_address: "50.91.5.27"
	},
	{
		id: 9,
		first_name: "Brigham",
		last_name: "Nickoles",
		email: "bnickoles8@reddit.com",
		gender: "Male",
		ip_address: "74.178.1.21"
	},
	{
		id: 10,
		first_name: "Brodie",
		last_name: "Pell",
		email: "bpell9@reverbnation.com",
		gender: "Male",
		ip_address: "191.190.116.10"
	}
]

export const ListDemo = () => (
	<ul>
		{dummyData.map((person) => (
			<li key={person.id}>
				{person.first_name} {person.last_name}
			</li>
		))}
	</ul>
)
