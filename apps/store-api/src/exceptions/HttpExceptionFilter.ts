import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException
} from "@nestjs/common"

import { StoreApiReply } from "../RequestReply"

import { HttpProblemException } from "./HttpProblemException"

@Catch(HttpException, HttpProblemException)
export class HttpExceptionFilter implements ExceptionFilter {
	public catch(
		exception: HttpException | HttpProblemException,
		host: ArgumentsHost
	) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<StoreApiReply>()

		let problem: HttpProblemException
		if (exception instanceof HttpException) {
			problem = HttpProblemException.NewFromHttpException(exception)
		} else if (exception instanceof HttpProblemException) {
			problem = exception
		} else {
			problem = HttpProblemException.NewInternalServerErrorException()
		}

		response.status(problem.httpProblem.status).send(problem.httpProblem)
	}
}
