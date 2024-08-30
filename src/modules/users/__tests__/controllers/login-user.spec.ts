import { Test } from '@nestjs/testing';

import { makeLoginUserDto } from '../_data_/factories/dtos/login-user.factory';

import { LoginUserController } from '@/modules/users/presenters/controllers/login-user.controller';
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

	afterAll((): void => {
		jest.clearAllMocks();
	});
});
