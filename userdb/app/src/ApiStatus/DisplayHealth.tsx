import type { HealthRespose } from "@react-workshop/userdb-api-clients"

export interface DisplayHealthProps {
	health: HealthRespose
}

export const DisplayHealth = ({ health }: DisplayHealthProps) => {
	return (
		<dl>
			<dt>Boot time</dt>
			<dd>{new Date(health.bootTime).toLocaleString()}</dd>
			<dt>Uptime</dt>
			<dd>{health.upTime}</dd>
			<dt>Database path</dt>
			<dd>{health.dbFilePath}</dd>
		</dl>
	)
}
