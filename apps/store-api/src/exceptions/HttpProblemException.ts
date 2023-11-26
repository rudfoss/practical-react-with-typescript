import { HttpException, InternalServerErrorException } from "@nestjs/common"
import { HttpProblem } from "./HttpProblem"
import { ZodError } from "zod"

export class HttpProblemException {
	public constructor(
		public readonly httpProblem: HttpProblem & { [x: string]: unknown },
		public readonly exception?: Error,
		public catchError = true
	) {
		try {
			this.httpProblem = HttpProblem.parse(httpProblem)
		} catch (error: unknown) {
			if (error instanceof ZodError) {
				this.httpProblem = {
					type: HttpProblemException.createType("HttpProblemSchemaParseError"),
					status: 500,
					title: "HttpProblem schema parse error",
					detail:
						"An Http Problem Exception failed to parse against the HttpProblem schema.",
					schemaErrors: error.format()
				}
			}

			throw error
		}
	}

	public static createType(problemType: string) {
		return `https://storeapi.prwt.no/problems/${problemType.replace(
			/[^a-zA-Z0-9-_]+/,
			""
		)}`
	}

	public static NewFromError(error: Error) {
		return new HttpProblemException({
			type: HttpProblemException.createType(error.name),
			status: 500,
			title: error.message,
			stack: error.stack?.split("\n")
		})
	}
	public static NewFromErrorLike(error: unknown | Error) {
		if (error instanceof Error) {
			return HttpProblemException.NewFromError(error)
		}

		return HttpProblemException.NewFromError(
			new Error(error?.toString() ?? "Unknown error")
		)
	}
	public static NewFromHttpException(httpException: HttpException) {
		return new HttpProblemException(
			{
				type: HttpProblemException.createType(httpException.message),
				status: httpException.getStatus()
			},
			httpException
		)
	}
	public static NewInternalServerErrorException() {
		return this.NewFromHttpException(new InternalServerErrorException())
	}
}
