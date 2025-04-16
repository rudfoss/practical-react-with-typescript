import {
	ValidationError as ClassValidatorValidationError,
	ValidatorOptions,
	validateSync
} from "class-validator"

/**
 * Wrapper for `class-validator` `ValidationError` that properly extends the Error class.
 */
export class ValidationError extends Error {
	public constructor(public validationErrors: ClassValidatorValidationError[]) {
		super(validationErrors.map((validationError) => validationError.toString()).join(", "))
	}

	/**
	 * Validates the incoming object and returns it or throws a ValidationError if validation fails.
	 * @param object
	 * @param validatorOptions
	 */
	public static validateOrThrow<T extends object>(object: T, validatorOptions?: ValidatorOptions) {
		const validationErrors = validateSync(object, validatorOptions)
		if (validationErrors.length > 0) throw new ValidationError(validationErrors)
		return object
	}
}
