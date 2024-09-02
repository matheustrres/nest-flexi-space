import { type CreateEntityProps, Entity } from '@/@core/entity';
import { EntityId } from '@/@core/entity-id';
import { type Optional } from '@/@core/types';
import { Slug } from '@/@core/value-objects/slug';

export type RoomProps = {
	name: string;
	slug: Slug;
	description: string;
	location: string;
	capacity: number;
	isReserved: boolean;
	availability: Date[];
};

export type RoomConstructorProps = CreateEntityProps<RoomProps>;

export type OptionalRoomConstructorProps = Optional<
	RoomProps,
	'availability' | 'isReserved' | 'slug'
>;

export class RoomEntity extends Entity<RoomProps> {
	private constructor(props: RoomConstructorProps) {
		super(props);
	}

	static createNew(props: OptionalRoomConstructorProps): RoomEntity {
		return new RoomEntity({
			id: new EntityId(),
			props: {
				...props,
				availability: props.availability ?? [],
				isReserved: props.isReserved ?? false,
				slug: props.slug ?? Slug.createFromText(props.name),
			},
		});
	}

	static restore(props: RoomConstructorProps): RoomEntity {
		return new RoomEntity(props);
	}
}
