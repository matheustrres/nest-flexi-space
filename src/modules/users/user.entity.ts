import { type ROLE } from '@/@core/consts/role';
import { type CreateEntityProps, Entity } from '@/@core/entity';
import { EntityId } from '@/@core/entity-id';

export type UserProps = {
	name: string;
	email: string;
	password: string;
	role: ROLE;
};

export type UserConstructorProps = CreateEntityProps<UserProps>;

export class UserEntity extends Entity<UserProps> {
	private constructor(props: UserConstructorProps) {
		super(props);
	}

	static createNew(props: UserProps): UserEntity {
		return new UserEntity({
			id: new EntityId(),
			props,
		});
	}

	static restore(props: UserConstructorProps): UserEntity {
		return new UserEntity(props);
	}
}
