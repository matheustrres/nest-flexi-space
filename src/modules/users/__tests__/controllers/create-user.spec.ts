import { Test } from '@nestjs/testing';

import { UserBuilder } from '../_data_/builders/user.builder';
import { makeCreateUserDto } from '../_data_/factories/dtos/create-user.factory';

import { CreateUserController } from '@/modules/users/presenters/controllers/create-user.controller';
import { UserViewModel } from '@/modules/users/presenters/user.view-model';
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
		expect(useCase.exec).toHaveBeenCalledWith(dto);
	});

	it('should create a user', async (): Promise<void> => {
		const dto = makeCreateUserDto();

		const user = new UserBuilder()
			.withName(dto.name)
			.withEmail(dto.email)
			.withPassword(dto.password)
			.withRole(dto.role)
			.build();

		jest.spyOn(useCase, 'exec').mockResolvedValueOnce({ user });

		const result = await sut.handle(dto);

		expect(useCase.exec).toHaveBeenCalledWith(dto);
		expect(result).toEqual(UserViewModel.toJson(user));
	});
});
