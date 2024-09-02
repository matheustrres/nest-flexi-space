import { Test } from '@nestjs/testing';

import { RoomBuilder } from '../_data_/builders/room.builder';
import { CreateRoomUseCaseBuilder } from '../_data_/builders/use-cases/create-room.builder';

import { RoomsRepository } from '@/modules/rooms/repositories/rooms.repository';
import { CreateRoomUseCase } from '@/modules/rooms/use-cases/create-room.use-case';
import { RoomAlreadyExistsException } from '@/modules/rooms/use-cases/exceptions/room-already-exists.exception';

describe(CreateRoomUseCase.name, (): void => {
	let roomsRepository: RoomsRepository;
	let sut: CreateRoomUseCase;

	beforeEach(async (): Promise<void> => {
		const testingModule = await Test.createTestingModule({
			providers: [
				{
					provide: RoomsRepository,
					useValue: {
						findBySlug: jest.fn(),
						upsert: jest.fn(),
					},
				},
				CreateRoomUseCase,
			],
		}).compile();

		roomsRepository = testingModule.get<RoomsRepository>(RoomsRepository);
		sut = testingModule.get<CreateRoomUseCase>(CreateRoomUseCase);
	});

	it('should be defined', (): void => {
		expect(roomsRepository).toBeDefined();
		expect(sut).toBeDefined();
	});

	it('should throw if given name is already in use by its slug', async (): Promise<void> => {
		const mockedRoom = new RoomBuilder().build();

		jest.spyOn(roomsRepository, 'findBySlug').mockResolvedValueOnce(mockedRoom);

		const {
			name,
			slug: {
				props: { value: slugValue },
			},
		} = mockedRoom.render();

		await expect(
			sut.exec(new CreateRoomUseCaseBuilder().withName(name).props),
		).rejects.toThrow(RoomAlreadyExistsException.bySlug(slugValue));
		expect(roomsRepository.findBySlug).toHaveBeenNthCalledWith(1, slugValue);
	});
});
