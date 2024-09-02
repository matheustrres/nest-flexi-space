import { RoomEntity } from './room.entity';

describe(RoomEntity.name, (): void => {
	it('should create a RoomEntity', (): void => {
		const room = RoomEntity.createNew({
			name: 'Mega Room',
			description: 'Room description',
			capacity: 10,
			location: 'Room location',
		});

		const { name, slug, isReserved } = room.render();

		expect(room).toBeDefined();
		expect(name).toBe('Mega Room');
		expect(slug.props.value).toBe('mega-room');
		expect(isReserved).toBe(false);
	});
});
