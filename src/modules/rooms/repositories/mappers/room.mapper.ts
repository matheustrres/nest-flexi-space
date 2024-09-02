import { type Room as PrismaRoom } from '@prisma/client';

import { EntityId } from '@/@core/entity-id';
import { Slug } from '@/@core/value-objects/slug';

import { RoomEntity } from '@/modules/rooms/room.entity';

export class RoomMapper {
	toDomain(room: PrismaRoom): RoomEntity {
		return RoomEntity.restore({
			id: new EntityId(room.id),
			props: {
				...room,
				slug: Slug.createFromText(room.slug),
			},
		});
	}

	toPrisma(room: RoomEntity): PrismaRoom {
		const { slug, ...rest } = room.render();

		return {
			...rest,
			id: room.id.toString(),
			slug: slug.props.value,
			createdAt: room.createdAt,
			updatedAt: new Date(),
		};
	}
}
