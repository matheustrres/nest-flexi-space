import { faker } from '@faker-js/faker';

import { type CreateUserDto } from '@/modules/users/presenters/controllers/dtos/create-user.dto';

export function makeCreateUserDto(dto?: Partial<CreateUserDto>): CreateUserDto {
	return {
		name: dto?.name ?? faker.person.fullName(),
		email: dto?.email ?? faker.internet.email(),
		password: dto?.password ?? faker.internet.password(),
		role: dto?.role ?? 'USER',
	};
}
