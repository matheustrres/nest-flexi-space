import { Injectable } from '@nestjs/common';

import { type ROLE } from '@/@core/consts/role';
import { type UseCase } from '@/@core/use-case';

/* eslint-disable @typescript-eslint/consistent-type-imports */
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { HashingService } from '@/modules/users/services/hashing.service';
import { UserAlreadyExistsException } from '@/modules/users/use-cases/exceptions/user-already-exists.exception';
import { UserEntity } from '@/modules/users/user.entity';

export type CreateUserUseCaseInput = {
	name: string;
	email: string;
	password: string;
	role: string;
};

export type CreateUserUseCaseOutput = {
	user: UserEntity;
};

@Injectable()
export class CreateUserUseCase
	implements UseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput>
{
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly hashingService: HashingService,
	) {}

	async exec(input: CreateUserUseCaseInput): Promise<CreateUserUseCaseOutput> {
		const foundUserByEmail = await this.usersRepository.findByEmail(
			input.email,
		);

		if (foundUserByEmail) {
			throw UserAlreadyExistsException.byEmail(input.email);
		}

		const hashedPassword = await this.hashingService.hashString(input.password);

		const user = UserEntity.createNew({
			...input,
			password: hashedPassword,
			role: input.role as ROLE,
		});

		await this.usersRepository.upsert(user);

		return {
			user,
		};
	}
}
