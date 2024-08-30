import { Module } from '@nestjs/common';

import { CreateUserController } from './presenters/controllers/create-user.controller';
import { UsersRepository } from './repositories/users.repository';
import { HashingService } from './services/hashing.service';
import { CreateUserUseCase } from './use-cases/create-user.use-case';

@Module({
	providers: [HashingService, UsersRepository, CreateUserUseCase],
	controllers: [CreateUserController],
})
export class UsersModule {}
