import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { type LoginUserDto, LoginUserDtoBodyPipe } from './dtos/login-user.dto';

import { type IController } from '@/@core/controller';

import { UserViewModel } from '@/modules/users/presenters/user.view-model';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LoginUserUseCase } from '@/modules/users/use-cases/login-user.use-case';

@Controller('users/login')
export class LoginUserController implements IController<any> {
	constructor(private readonly useCase: LoginUserUseCase) {}

	@Post()
	@HttpCode(HttpStatus.OK)
	async handle(@Body(LoginUserDtoBodyPipe) body: LoginUserDto): Promise<any> {
		const { accessToken, user } = await this.useCase.exec(body);

		return {
			accessToken,
			user: UserViewModel.toJson(user),
		};
	}
}
