import { ConflictException } from '@nestjs/common';

export class RoomAlreadyExistsException extends ConflictException {
	private constructor(message: string) {
		super(message);
	}

	static bySlug(slug: string): RoomAlreadyExistsException {
		return new RoomAlreadyExistsException(
			`A room named "${slug}" already exists.`,
		);
	}
}
