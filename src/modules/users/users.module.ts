import { Module } from '@nestjs/common';

import { CreateUserController } from './presenters/controllers/create-user.controller';
import { LoginUserController } from './presenters/controllers/login-user.controller';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { LoginUserUseCase } from './use-cases/login-user.use-case';

import { HashingService } from '@/shared/lib/services/hashing.service';
import { TokenService } from '@/shared/lib/services/token.service';
import { EnvModule } from '@/shared/modules/env/env.module';

@Module({
	imports: [EnvModule],
	providers: [
		HashingService,
		TokenService,
		UsersRepository,
		CreateUserUseCase,
		LoginUserUseCase,
	],
	controllers: [CreateUserController, LoginUserController],
	exports: [TokenService],
})
export class UsersModule {}
