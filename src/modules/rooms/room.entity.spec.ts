import { type OptionalRoomConstructorProps, RoomEntity } from './room.entity';

describe(RoomEntity.name, (): void => {
	const roomProps: OptionalRoomConstructorProps = {
		name: 'Mega Room',
		description: 'Room description',
		capacity: 10,
		location: 'Room location',
	};

	it('should create a RoomEntity', (): void => {
		const room = RoomEntity.createNew(roomProps);

		const { name, slug, isReserved } = room.render();

		expect(room).toBeDefined();
		expect(name).toBe('Mega Room');
		expect(slug.props.value).toBe('mega-room');
		expect(isReserved).toBe(false);
	});

	it('should restore a RoomEntity', (): void => {
		const room = RoomEntity.createNew(roomProps);
		const restoredRoom = RoomEntity.restore({
			id: room.id,
			props: room.render(),
		});

		expect(room).toBeDefined();
		expect(restoredRoom).toBeDefined();
		expect(restoredRoom).toStrictEqual(room);
	});
});
