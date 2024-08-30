import { faker } from '@faker-js/faker';

import { UserBuilder } from '../user.builder';

import {
	type LoginUserUseCaseInput,
	type LoginUserUseCaseOutput,
} from '@/modules/users/use-cases/login-user.use-case';

export class LoginUserUseCaseBuilder {
	props: LoginUserUseCaseInput = {
		email: faker.internet.email(),
		password: faker.internet.password(),
	};

	withEmail(email: string): this {
		this.props.email = email;
		return this;
	}

	withPassword(password: string): this {
		this.props.password = password;
		return this;
	}

	build(): LoginUserUseCaseOutput {
		const { email, password } = this.props;

		return {
			accessToken: 'random_access_token',
			user: new UserBuilder().withEmail(email).withPassword(password).build(),
		};
	}
}
