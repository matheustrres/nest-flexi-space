import { UserEntity, type UserProps } from './user.entity';

describe('UserEntity', (): void => {
	const userProps: UserProps = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		password: 'youshallnotpass',
		role: 'ADMIN',
	};

	it('should create a UserEntity', (): void => {
		const user = UserEntity.createNew(userProps);

		expect(user).toBeDefined();
		expect(user.render()).toStrictEqual(userProps);
	});

	it('should restore a UserEntity', (): void => {
		const user = UserEntity.createNew(userProps);
		const restoredUser = UserEntity.restore({
			id: user.id,
			props: {
				...user.render(),
			},
		});

		expect(user).toBeDefined();
		expect(restoredUser).toBeDefined();
		expect(restoredUser).toStrictEqual(user);
	});
});
