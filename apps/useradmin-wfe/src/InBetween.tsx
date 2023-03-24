import { memo } from "react"

import { TextField } from "@prt/fields"
import { SlowDown } from "@prt/utils"

interface InBetweenProps {
	lastName: string
	setLastName: (newLastName: string) => unknown
}

export const InBetween = memo(({ lastName, setLastName }: InBetweenProps) => {
	return (
		<>
			<SlowDown factor={40} />
			<TextField label="Etternavn" value={lastName} onChange={setLastName} />
		</>
	)
})
