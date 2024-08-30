import { Test } from '@nestjs/testing';

import { makeCreateUserDto } from '../_data_/factories/dtos/create-user.factory';

import { CreateUserController } from '@/modules/users/presenters/controllers/create-user.controller';
import { CreateUserUseCase } from '@/modules/users/use-cases/create-user.use-case';
import { UserAlreadyExistsException } from '@/modules/users/use-cases/exceptions/user-already-exists.exception';

describe(CreateUserController.name, (): void => {
	let useCase: CreateUserUseCase;
	let sut: CreateUserController;

	beforeEach(async (): Promise<void> => {
		const testingModule = await Test.createTestingModule({
			controllers: [CreateUserController],
			providers: [
				{
					provide: CreateUserUseCase,
					useValue: {
						exec: jest.fn(),
					},
				},
			],
		}).compile();

		useCase = testingModule.get<CreateUserUseCase>(CreateUserUseCase);
		sut = testingModule.get<CreateUserController>(CreateUserController);
	});

	it('should be defined', (): void => {
		expect(useCase).toBeDefined();
		expect(sut).toBeDefined();
	});

	it('should throw a UserAlreadyExistsException if given email address is already in use', async (): Promise<void> => {
		const dto = makeCreateUserDto();

		jest
			.spyOn(useCase, 'exec')
			.mockRejectedValueOnce(UserAlreadyExistsException.byEmail(dto.email));

		const promise = sut.handle(dto);

		await expect(promise).rejects.toThrow(
			UserAlreadyExistsException.byEmail(dto.email),
		);
		expect(useCase.exec).toHaveBeenNthCalledWith(1, dto);
	});

	afterAll((): void => {
		jest.clearAllMocks();
	});
});
