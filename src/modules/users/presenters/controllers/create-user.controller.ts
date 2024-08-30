import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import {
	type CreateUserDto,
	CreateUserDtoBodyPipe,
} from './dtos/create-user.dto';

import { type IController } from '@/@core/controller';

import {
	type UserToJson,
	UserViewModel,
} from '@/modules/users/presenters/user.view-model';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { CreateUserUseCase } from '@/modules/users/use-cases/create-user.use-case';

@Controller('users')
export class CreateUserController implements IController<UserToJson> {
	constructor(private readonly useCase: CreateUserUseCase) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async handle(
		@Body(CreateUserDtoBodyPipe) body: CreateUserDto,
	): Promise<UserToJson> {
		const { user } = await this.useCase.exec(body);

		return UserViewModel.toJson(user);
	}
}
