import {
	HttpException,
	HttpStatus,
	InternalServerErrorException
} from "@nestjs/common"
import { HttpProblem } from "./HttpProblem"

export class HttpProblemException {
	public constructor(
		public readonly httpProblem: HttpProblem,
		public readonly exception?: Error
	) {}

	public static NewFromHttpException(httpException: HttpException) {
		return new HttpProblemException(
			HttpProblem.parse({
				type: httpException.message,
				status: httpException.getStatus()
			} as HttpProblem),
			httpException
		)
	}

	public static NewInternalServerErrorException() {
		return this.NewFromHttpException(new InternalServerErrorException())
	}
}
