import { useState } from "react"

export const useLocalStorage = <TValue>(key: string, initialValue: TValue) => {
	const [storedValue, setStoredValue] = useState<TValue>(() => {
		const rawValue = localStorage.getItem(key)
		return rawValue ? JSON.parse(rawValue) : initialValue
	})

	const setValue = (newValue: TValue) => {
		localStorage.setItem(key, JSON.stringify(newValue))
		setStoredValue(newValue)
	}

	return [storedValue, setValue] as const
}
