import { type User as PrismaUser } from '@prisma/client';

import { type ROLE } from '@/@core/consts/role';
import { EntityId } from '@/@core/entity-id';

import { UserEntity } from '@/modules/users/user.entity';

export class UsersMapper {
	toDomain(user: PrismaUser): UserEntity {
		return UserEntity.restore({
			id: new EntityId(user.id),
			props: {
				...user,
				role: user.role as ROLE,
			},
		});
	}

	toPrisma(user: UserEntity): PrismaUser {
		return {
			id: user.id.toString(),
			...user.render(),
			createdAt: user.createdAt,
			updatedAt: new Date(),
		};
	}
}
