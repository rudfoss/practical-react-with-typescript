import { ListData } from "./ListData"
import { staticGroups } from "./staticGroups"

export const App = () => {
	return (
		<>
			<ListData groups={staticGroups} />
			<ListData groups={staticGroups} />
		</>
	)
}
