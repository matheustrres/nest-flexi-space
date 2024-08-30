import { UserEntity, type UserProps } from './user.entity';

describe('UserEntity', (): void => {
	it('should create a UserEntity', (): void => {
		const userProps: UserProps = {
			name: 'John Doe',
			email: 'john.doe@gmail.com',
			password: 'youshallnotpass',
			role: 'ADMIN',
		};

		const user = UserEntity.createNew(userProps);

		expect(user).toBeDefined();
		expect(user.render()).toStrictEqual(userProps);
	});
});
