import { ChangeEvent, useId } from "react"

import classes from "./ChoiceField.module.css"

export interface ChoiceFieldOption {
  /**
   * Visible title for an option
   */
  label: string
  /**
   * Unique identifier for an option inside a set of options
   */
  value: string
}

export interface ChoiceFieldProps<TChoice> {
  label: string
  value?: TChoice
  setValue: (newChoice?: TChoice) => unknown
  choices: TChoice[]
  choiceToOption: (choice: TChoice) => ChoiceFieldOption
  disabled?: boolean
}

export const ChoiceField = <TChoice,>({
  label,
  value,
  setValue,
  choices,
  choiceToOption,
  disabled
}: ChoiceFieldProps<TChoice>) => {
  const id = useId()
  const options = choices.map((choice) => choiceToOption(choice))
  const selectedOption = value && choiceToOption(value).value

  const selectOption = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.currentTarget.value
    const selectedChoice = choices.find(
      (choice) => choiceToOption(choice).value === selectedValue
    )
    setValue(selectedChoice)
  }

  return (
    <div className={classes.container}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={selectedOption ?? ""}
        onChange={selectOption}
        disabled={disabled}
      >
        <option value=""></option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
