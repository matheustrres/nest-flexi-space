import { faker } from '@faker-js/faker';

import { type ROLE } from '@/@core/consts/role';

import { UserEntity, type UserProps } from '@/modules/users/user.entity';

export class UserBuilder {
	props: UserProps = {
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

	build(): UserEntity {
		return UserEntity.createNew(this.props);
	}
}
