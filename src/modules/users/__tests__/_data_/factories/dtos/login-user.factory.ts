import { faker } from '@faker-js/faker';

import { type LoginUserDto } from '@/modules/users/presenters/controllers/dtos/login-user.dto';

export function makeLoginUserDto(dto?: Partial<LoginUserDto>): LoginUserDto {
	return {
		email: dto?.email ?? faker.internet.email(),
		password: dto?.password ?? faker.internet.password(),
	};
}
