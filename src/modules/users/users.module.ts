import { Module } from '@nestjs/common';

import { UsersRepository } from './repositories/users.repository';
import { HashingService } from './services/hashing.service';
import { CreateUserUseCase } from './use-cases/create-user.use-case';

@Module({
	providers: [HashingService, UsersRepository, CreateUserUseCase],
})
export class UsersModule {}
