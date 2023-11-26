import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException
} from "@nestjs/common"
import { HttpProblemException } from "./HttpProblemException"
import { StoreApiReply } from "../RequestReply"

@Catch(HttpException, HttpProblemException)
export class HttpExceptionFilter implements ExceptionFilter {
	public catch(
		exception: HttpException | HttpProblemException,
		host: ArgumentsHost
	) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<StoreApiReply>()

		let problem = HttpProblemException.NewInternalServerErrorException()
		if (exception instanceof HttpException) {
			problem = HttpProblemException.NewFromHttpException(exception)
		}

		response.status(problem.httpProblem.status).send(problem.httpProblem)
	}
}
