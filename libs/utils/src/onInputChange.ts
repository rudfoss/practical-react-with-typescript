import * as React from "react"

/**
 * Given a setter (and optional filter) will construct an onChange compatible function that updates the setter every time the value changes.
 * @param setter The setter to trigger on value changes
 * @param filter An optional filter to determine IF the setter should be triggered
 * @returns
 */
export const onValueChange =
	(setter: (newValue: string) => unknown, filter?: (newValue: string) => boolean) =>
	(evt: React.ChangeEvent<HTMLInputElement>) => {
		if (filter && !filter(evt.target.value)) {
			return
		}
		setter(evt.target.value)
	}

/**
 * Given a setter (and optionla filter) will construct an onChange compatible function that updates the setter every time the checked state for a radio or checkbox input changes.
 * @param setter The setter to trigger on checked changes
 * @param filter An optional filter to determine IF the setter should be triggered
 * @returns
 */
export const onCheckedChange =
	(setter: (newValue: boolean) => unknown, filter?: (newValue: boolean) => boolean) =>
	(evt: React.ChangeEvent<HTMLInputElement>) => {
		if (filter && !filter(evt.target.checked)) {
			return
		}
		setter(evt.target.checked)
	}

/**
 * Given a setter (and optionla filter) will construct an onChange compatible function that updates the setter every time the value state for a numeric input changes.
 * @param setter The setter to trigger on checked changes
 * @param filter An optional filter to determine IF the setter should be triggered
 * @returns
 */
export const onNumberChange =
	(setter: (newValue: number) => unknown, filter?: (newValue: number) => boolean) =>
	(evt: React.ChangeEvent<HTMLInputElement>) => {
		if (filter && !filter(evt.target.valueAsNumber)) {
			return
		}
		setter(evt.target.valueAsNumber)
	}
