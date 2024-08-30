import { faker } from '@faker-js/faker';

import { UserBuilder } from '../user.builder';

import { type ROLE } from '@/@core/consts/role';

import {
	type CreateUserUseCaseInput,
	type CreateUserUseCaseOutput,
} from '@/modules/users/use-cases/create-user.use-case';

export class CreateUserUseCaseBuilder {
	props: CreateUserUseCaseInput = {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		role: 'USER',
	};

	withName(name: string): this {
		this.props.name = name;
		return this;
	}

	withEmail(email: string): this {
		this.props.email = email;
		return this;
	}

	withPassword(password: string): this {
		this.props.password = password;
		return this;
	}

	withRole(role: ROLE): this {
		this.props.role = role;
		return this;
	}

	build(): CreateUserUseCaseOutput {
		const { name, email, password, role } = this.props;

		return {
			user: new UserBuilder()
				.withName(name)
				.withEmail(email)
				.withPassword(password)
				.withRole(role as ROLE)
				.build(),
		};
	}
}
