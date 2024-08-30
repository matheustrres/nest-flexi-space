import { Injectable } from '@nestjs/common';

import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';

import { type UseCase } from '@/@core/use-case';

/* eslint-disable @typescript-eslint/consistent-type-imports */
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { HashingService } from '@/modules/users/services/hashing.service';
import { TokenService } from '@/modules/users/services/token.service';
import { type UserEntity } from '@/modules/users/user.entity';

export type LoginUserUseCaseInput = {
	email: string;
	password: string;
};

export type LoginUserUseCaseOutput = {
	accessToken: string;
	user: UserEntity;
};

@Injectable()
export class LoginUserUseCase
	implements UseCase<LoginUserUseCaseInput, LoginUserUseCaseOutput>
{
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly hashingService: HashingService,
		private readonly tokenService: TokenService,
	) {}

	async exec(input: LoginUserUseCaseInput): Promise<LoginUserUseCaseOutput> {
		const user = await this.usersRepository.findByEmail(input.email);

		if (!user) throw new InvalidCredentialsException();

		const isValidPassword = await this.hashingService.compareStrings({
			plainStr: input.password,
			hashedString: user.render().password,
		});

		if (!isValidPassword) throw new InvalidCredentialsException();

		const accessToken = await this.tokenService.signToken({
			sub: user.id.toString(),
			role: user.render().role,
		});

		return {
			accessToken,
			user,
		};
	}
}
