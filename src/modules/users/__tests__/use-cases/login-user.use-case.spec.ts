import { Test } from '@nestjs/testing';

import { LoginUserUseCaseBuilder } from '../_data_/builders/use-cases/login-user.builder';

import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { HashingService } from '@/modules/users/services/hashing.service';
import { TokenService } from '@/modules/users/services/token.service';
import { InvalidCredentialsException } from '@/modules/users/use-cases/exceptions/invalid-credentials.exception';
import { LoginUserUseCase } from '@/modules/users/use-cases/login-user.use-case';

describe(LoginUserUseCase.name, (): void => {
	let usersRepository: UsersRepository;
	let hashingService: HashingService;
	let tokenService: TokenService;
	let sut: LoginUserUseCase;

	beforeEach(async (): Promise<void> => {
		const testingModule = await Test.createTestingModule({
			providers: [
				{
					provide: UsersRepository,
					useValue: {
						findByEmail: jest.fn(),
					},
				},
				{
					provide: HashingService,
					useValue: {
						compareStrings: jest.fn(),
					},
				},
				{
					provide: TokenService,
					useValue: {
						signToken: jest.fn(),
					},
				},
				LoginUserUseCase,
			],
		}).compile();

		usersRepository = testingModule.get<UsersRepository>(UsersRepository);
		hashingService = testingModule.get<HashingService>(HashingService);
		tokenService = testingModule.get<TokenService>(TokenService);
		sut = testingModule.get<LoginUserUseCase>(LoginUserUseCase);
	});

	it('should be defined', (): void => {
		expect(usersRepository).toBeDefined();
		expect(hashingService).toBeDefined();
		expect(tokenService).toBeDefined();
		expect(sut).toBeDefined();
	});

	it('should throw if no user is found with given email address', async (): Promise<void> => {
		jest.spyOn(usersRepository, 'findByEmail').mockResolvedValueOnce(null);

		const input = new LoginUserUseCaseBuilder().props;

		const promise = sut.exec(input);

		await expect(promise).rejects.toThrow(new InvalidCredentialsException());
		expect(usersRepository.findByEmail).toHaveBeenNthCalledWith(1, input.email);
	});
});
