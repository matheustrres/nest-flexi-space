import { Module } from '@nestjs/common';

import { RoomsRepository } from './repositories/rooms.repository';
import { CreateRoomUseCase } from './use-cases/create-room.use-case';

@Module({
	providers: [RoomsRepository, CreateRoomUseCase],
})
export class RoomsModule {}
