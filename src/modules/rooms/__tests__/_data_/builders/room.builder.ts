import { faker } from '@faker-js/faker';

import {
	type OptionalRoomConstructorProps,
	RoomEntity,
} from '@/modules/rooms/room.entity';

export class RoomBuilder {
	props: OptionalRoomConstructorProps = {
		name: faker.company.name(),
		description: faker.lorem.text(),
		capacity: faker.number.int(),
		location: faker.location.street(),
		availability: [
			faker.date.future(),
			faker.date.future(),
			faker.date.future(),
		],
		isReserved: faker.datatype.boolean(),
	};

	withName(name: string): this {
		this.props.name = name;
		return this;
	}

	withDescription(description: string): this {
		this.props.description = description;
		return this;
	}

	withCapacity(capacity: number): this {
		this.props.capacity = capacity;
		return this;
	}

	withLocation(location: string): this {
		this.props.location = location;
		return this;
	}

	withAvailabilities(availabilities: Date[]): this {
		this.props.availability = availabilities;
		return this;
	}

	withIsReserved(isReserved: boolean): this {
		this.props.isReserved = isReserved;
		return this;
	}

	build(): RoomEntity {
		return RoomEntity.createNew(this.props);
	}
}
