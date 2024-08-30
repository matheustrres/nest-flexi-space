import { Injectable } from '@nestjs/common';

import { UsersMapper } from './mappers/user.mapper';

import { type UserEntity } from '@/modules/users/user.entity';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '@/shared/modules/prisma/prisma.service';

@Injectable()
export class UsersRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async findByEmail(email: string): Promise<UserEntity | null> {
		const user = await this.prismaService.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) return null;

		return new UsersMapper().toDomain(user);
	}

	async upsert(user: UserEntity): Promise<void> {
		const prismaUser = new UsersMapper().toPrisma(user);

		await this.prismaService.user.upsert({
			where: {
				id: user.id.toString(),
			},
			create: prismaUser,
			update: prismaUser,
		});
	}
}
