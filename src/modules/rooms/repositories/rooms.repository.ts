import { Injectable } from '@nestjs/common';

import { RoomMapper } from './mappers/room.mapper';

import { type RoomEntity } from '@/modules/rooms/room.entity';

import { type PrismaService } from '@/shared/modules/prisma/prisma.service';

@Injectable()
export class RoomsRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async findBySlug(slug: string): Promise<RoomEntity | null> {
		const room = await this.prismaService.room.findUnique({
			where: {
				slug,
			},
		});

		if (!room) return null;

		return new RoomMapper().toDomain(room);
	}

	async upsert(room: RoomEntity): Promise<void> {
		const prismaRoom = new RoomMapper().toPrisma(room);

		await this.prismaService.room.upsert({
			where: {
				id: room.id.toString(),
			},
			create: prismaRoom,
			update: prismaRoom,
		});
	}
}
