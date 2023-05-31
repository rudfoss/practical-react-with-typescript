import { useState } from "react"

/**
 * Returns getter and setter for a value stored in localStorage. Does not update values if the key changes dynamically.
 * @param key
 * @param initialValue
 * @returns
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		const rawValue = window.localStorage.getItem(key)
		return rawValue ? JSON.parse(rawValue) : initialValue
	})

	const setValue = (newValue: T) => {
		window.localStorage.setItem(key, JSON.stringify(newValue))
		setStoredValue(newValue)
	}

	return [storedValue, setValue]
}
