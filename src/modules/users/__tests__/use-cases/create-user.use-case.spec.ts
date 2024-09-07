import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';

import { CreateUserUseCaseBuilder } from '../_data_/builders/use-cases/create-user.builder';
import { UserBuilder } from '../_data_/builders/user.builder';

import { type ROLE } from '@/@core/consts/role';

import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { CreateUserUseCase } from '@/modules/users/use-cases/create-user.use-case';
import { UserAlreadyExistsException } from '@/modules/users/use-cases/exceptions/user-already-exists.exception';

import { HashingService } from '@/shared/lib/services/hashing.service';

describe('CreateUserUseCase', () => {
	let usersRepository: UsersRepository;
	let hashingService: HashingService;
	let sut: CreateUserUseCase;

	beforeEach(async (): Promise<void> => {
		const testingModule = await Test.createTestingModule({
			providers: [
				{
					provide: UsersRepository,
					useValue: {
						findByEmail: jest.fn(),
						upsert: jest.fn(),
					},
				},
				{
					provide: HashingService,
					useValue: {
						hashString: jest.fn(),
					},
				},
				CreateUserUseCase,
			],
		}).compile();

		usersRepository = testingModule.get<UsersRepository>(UsersRepository);
		hashingService = testingModule.get<HashingService>(HashingService);
		sut = testingModule.get<CreateUserUseCase>(CreateUserUseCase);
	});

	it('should be defined', (): void => {
		expect(usersRepository).toBeDefined();
		expect(hashingService).toBeDefined();
		expect(sut).toBeDefined();
	});

	it('should throw if given email address is already in use', async (): Promise<void> => {
		const email = faker.internet.email();

		jest
			.spyOn(usersRepository, 'findByEmail')
			.mockResolvedValueOnce(new UserBuilder().withEmail(email).build());

		const promise = sut.exec(
			new CreateUserUseCaseBuilder().withEmail(email).props,
		);

		await expect(promise).rejects.toThrow(
			UserAlreadyExistsException.byEmail(email),
		);
		expect(usersRepository.findByEmail).toHaveBeenNthCalledWith(1, email);
	});

	it('should create a new user', async (): Promise<void> => {
		jest.spyOn(usersRepository, 'findByEmail').mockResolvedValueOnce(null);
		jest
			.spyOn(hashingService, 'hashString')
			.mockResolvedValueOnce('my_hashed_password');

		const email = 'john.doe@gmail.com';

		const { user } = await sut.exec(
			new CreateUserUseCaseBuilder()
				.withName('John Doe')
				.withEmail(email)
				.withRole('ADMIN').props,
		);

		const { name, email: userEmail, role } = user.render();

		expect(user).toBeDefined();
		expect(name).toBe('John Doe');
		expect(userEmail).toBe(email);
		expect(role).toBe<ROLE>('ADMIN');
	});
});
