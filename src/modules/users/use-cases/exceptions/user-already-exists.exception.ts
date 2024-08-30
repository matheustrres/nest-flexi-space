import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
	private constructor(message: string) {
		super(message);
	}

	static byEmail(email: string): UserAlreadyExistsException {
		return new UserAlreadyExistsException(
			`The following email address "${email}" is already in use.`,
		);
	}
}
