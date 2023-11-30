import { ClickUntilForm } from "./ClickUntilForm"
import { MainLayout } from "./MainLayout"

export const App = () => {
	return (
		<MainLayout nav={<p>Nav</p>} footer={<p>Footer</p>}>
			<ClickUntilForm />
		</MainLayout>
	)
}
