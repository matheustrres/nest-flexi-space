import { Injectable } from '@nestjs/common';

import { RoomAlreadyExistsException } from './exceptions/room-already-exists.exception';

import { type RoomsRepository } from '../repositories/rooms.repository';

import { type UseCase } from '@/@core/use-case';
import { Slug } from '@/@core/value-objects/slug';

import { RoomEntity } from '@/modules/rooms/room.entity';

export type CreateRoomUseCaseInput = {
	name: string;
	description: string;
	location: string;
	capacity: number;
	isReserved?: boolean;
	availability?: Date[];
};

export type CreateRoomUseCaseOutput = {
	room: RoomEntity;
};

@Injectable()
export class CreateRoomUseCase
	implements UseCase<CreateRoomUseCaseInput, CreateRoomUseCaseOutput>
{
	constructor(private readonly roomsRepository: RoomsRepository) {}

	async exec(input: CreateRoomUseCaseInput): Promise<CreateRoomUseCaseOutput> {
		const slug = Slug.createFromText(input.name);

		const foundRoomBySlug = await this.roomsRepository.findBySlug(
			slug.props.value,
		);

		if (foundRoomBySlug)
			throw RoomAlreadyExistsException.bySlug(slug.props.value);

		const room = RoomEntity.createNew({
			...input,
			slug,
		});

		await this.roomsRepository.upsert(room);

		return {
			room,
		};
	}
}
