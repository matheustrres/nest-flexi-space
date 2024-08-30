import { type UserEntity } from '@/modules/users/user.entity';

export type UserToJson = {
	id: string;
	name: string;
	email: string;
	role: string;
	created_at: Date;
};

export class UserViewModel {
	static toJson(user: UserEntity): UserToJson {
		const { name, email, role } = user.render();

		return {
			id: user.id.toString(),
			name,
			email,
			role,
			created_at: user.createdAt,
		};
	}
}
