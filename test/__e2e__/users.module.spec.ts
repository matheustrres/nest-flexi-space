import { type INestApplication } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { resetDb } from './helpers/prisma/utils/reset-db';
import { runMigrations } from './helpers/prisma/utils/run-migrations';

import { makeCreateUserDto } from '@/modules/users/__tests__/_data_/factories/dtos/create-user.factory';
import { UsersModule } from '@/modules/users/users.module';

import { GlobalExceptionFilter } from '@/shared/lib/exceptions/filters/global-exception-filter';
import { ZodExceptionFilter } from '@/shared/lib/exceptions/filters/zod-exception-filter';
import { PrismaModule } from '@/shared/modules/prisma/prisma.module';
import { PrismaService } from '@/shared/modules/prisma/prisma.service';

describe(UsersModule.name, (): void => {
	let app: INestApplication;
	let prismaService: PrismaService;

	beforeAll(async (): Promise<void> => {
		const testingModule = await Test.createTestingModule({
			imports: [UsersModule, PrismaModule],
			providers: [
				{
					provide: APP_FILTER,
					useClass: GlobalExceptionFilter,
				},
				{
					provide: APP_FILTER,
					useClass: ZodExceptionFilter,
				},
			],
		}).compile();

		app = testingModule.createNestApplication();
		prismaService = app.get<PrismaService>(PrismaService);

		await runMigrations();
		await app.init();
	});

	beforeEach(async (): Promise<void> => {
		await resetDb();
	});

	describe('X POST /users', (): void => {
		it('should return an error when trying to create a user with an already in use email address', async (): Promise<void> => {
			const httpServer = app.getHttpServer();
			const dto = makeCreateUserDto();

			await request(httpServer).post('/users').send(dto);

			return request(httpServer)
				.post('/users')
				.send(dto)
				.expect(409)
				.then((res) => {
					expect(res.body['timestamp']).toBeDefined();
					expect(res.body).toMatchObject({
						status: 'ERROR',
						code: 409,
						content: `The following email address "${dto.email}" is already in use.`,
						endpoint: 'POST /users',
					});
				});
		});

		it('should return the created user', async (): Promise<void> => {
			const dto = makeCreateUserDto({
				name: 'John Doe',
				email: 'john.doe@gmail.com',
			});

			return request(app.getHttpServer())
				.post('/users')
				.send(dto)
				.expect(201)
				.then((res) => {
					expect(res.body['id']).toBeDefined();
					expect(res.body).toMatchObject({
						name: 'John Doe',
						email: 'john.doe@gmail.com',
						role: 'USER',
					});
					expect(res.body['created_at']).toBeDefined();
				});
		});
	});

	describe('X POST /users/login', (): void => {
		it('should return an error when trying to authenticate with an unregistered account', async (): Promise<void> => {
			return request(app.getHttpServer())
				.post('/users/login')
				.send(makeCreateUserDto())
				.expect(401)
				.then((res) => {
					expect(res.body['timestamp']).toBeDefined();
					expect(res.body).toMatchObject({
						status: 'ERROR',
						code: 401,
						content: 'Invalid credentials provided. Please, try again.',
						endpoint: 'POST /users/login',
					});
				});
		});

		it('should return an error when provided password does not match user hashed password', async (): Promise<void> => {
			const httpServer = app.getHttpServer();
			const dto = makeCreateUserDto({
				password: 'easy_password',
			});

			await request(httpServer).post('/users').send(dto);

			return request(httpServer)
				.post('/users/login')
				.send({
					...dto,
					password: 'different_password',
				})
				.expect(401)
				.then((res) => {
					expect(res.body['timestamp']).toBeDefined();
					expect(res.body).toMatchObject({
						status: 'ERROR',
						code: 401,
						content: 'Invalid credentials provided. Please, try again.',
						endpoint: 'POST /users/login',
					});
				});
		});
	});

	afterAll(async (): Promise<void> => {
		await resetDb();
		await prismaService.$disconnect();
		await app.close();
	});
});
