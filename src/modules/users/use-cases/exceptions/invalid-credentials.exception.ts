import { UnauthorizedException } from '@nestjs/common';

const errMessage = 'Invalid credentials provided. Please, try again.';

export class InvalidCredentialsException extends UnauthorizedException {
	constructor(message = errMessage) {
		super(message);
	}
}
