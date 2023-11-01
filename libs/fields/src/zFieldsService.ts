import { create } from "zustand"

interface FieldsStore {
	isDisabled: boolean
	setIsDisabled: (flag: boolean) => unknown
}

export const useFieldsStore = create<FieldsStore>()((set) => ({
	isDisabled: false,
	setIsDisabled: (flag) => {
		set({
			isDisabled: flag
		})
	}
}))
