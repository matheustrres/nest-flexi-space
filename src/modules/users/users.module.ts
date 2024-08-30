import { Module } from '@nestjs/common';

import { CreateUserController } from './presenters/controllers/create-user.controller';
import { LoginUserController } from './presenters/controllers/login-user.controller';
import { UsersRepository } from './repositories/users.repository';
import { HashingService } from './services/hashing.service';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { LoginUserUseCase } from './use-cases/login-user.use-case';

@Module({
	providers: [
		HashingService,
		UsersRepository,
		CreateUserUseCase,
		LoginUserUseCase,
	],
	controllers: [CreateUserController, LoginUserController],
})
export class UsersModule {}
