import { Test } from '@nestjs/testing';

import { UserBuilder } from '../_data_/builders/user.builder';
import { makeLoginUserDto } from '../_data_/factories/dtos/login-user.factory';

import { LoginUserController } from '@/modules/users/presenters/controllers/login-user.controller';
import { UserViewModel } from '@/modules/users/presenters/user.view-model';
import { InvalidCredentialsException } from '@/modules/users/use-cases/exceptions/invalid-credentials.exception';
import { LoginUserUseCase } from '@/modules/users/use-cases/login-user.use-case';

describe(LoginUserController.name, (): void => {
	let useCase: LoginUserUseCase;
	let sut: LoginUserController;

	beforeEach(async (): Promise<void> => {
		const testingModule = await Test.createTestingModule({
			controllers: [LoginUserController],
			providers: [
				{
					provide: LoginUserUseCase,
					useValue: {
						exec: jest.fn(),
					},
				},
			],
		}).compile();

		useCase = testingModule.get<LoginUserUseCase>(LoginUserUseCase);
		sut = testingModule.get<LoginUserController>(LoginUserController);
	});

	it('should be defined', (): void => {
		expect(useCase).toBeDefined();
		expect(sut).toBeDefined();
	});

	it('should throw a InvalidCredentialsException if user provides invalid credentials', async (): Promise<void> => {
		jest
			.spyOn(useCase, 'exec')
			.mockRejectedValueOnce(new InvalidCredentialsException());

		const dto = makeLoginUserDto();

		const promise = sut.handle(dto);

		await expect(promise).rejects.toThrow(new InvalidCredentialsException());
		expect(useCase.exec).toHaveBeenCalledWith(dto);
	});

	it('should return an access token and user on successful login', async () => {
		const dto = makeLoginUserDto();
		const user = new UserBuilder()
			.withEmail(dto.email)
			.withPassword(dto.password)
			.build();
		const accessToken = 'random_access_token';

		jest.spyOn(useCase, 'exec').mockResolvedValueOnce({
			accessToken,
			user,
		});

		const result = await sut.handle(dto);

		expect(useCase.exec).toHaveBeenCalledWith(dto);
		expect(result).toStrictEqual({
			accessToken,
			user: UserViewModel.toJson(user),
		});
	});

	afterAll((): void => {
		jest.clearAllMocks();
	});
});
