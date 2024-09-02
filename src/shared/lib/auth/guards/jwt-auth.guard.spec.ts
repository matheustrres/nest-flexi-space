import { UnauthorizedException, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { type IncomingHttpHeaders } from 'http';

import { JwtAuthGuard } from './jwt-auth.guard';

import { TokenService } from '@/modules/users/services/token.service';

import { getJwtErrorMessage } from '@/shared/lib/auth/errors/jwt';

type MockExecutionCtxOptions = {
	request?: {
		headers?: IncomingHttpHeaders;
	};
};

function createMockExecutionCtx(
	options?: MockExecutionCtxOptions,
): ExecutionContext {
	return {
		switchToHttp: jest.fn().mockReturnValue({
			getRequest: jest.fn().mockReturnValue(options?.request),
		}),
		getHandler: jest.fn(),
		getClass: jest.fn(),
	} as unknown as ExecutionContext;
}

describe(JwtAuthGuard.name, (): void => {
	let tokenService: TokenService;
	let reflector: Reflector;
	let sut: JwtAuthGuard;

	beforeEach(async (): Promise<void> => {
		const testingModule = await Test.createTestingModule({
			providers: [
				{
					provide: TokenService,
					useValue: {
						verifyToken: jest.fn(),
					},
				},
				{
					provide: Reflector,
					useValue: {
						getAllAndOverride: jest.fn(),
					},
				},
				JwtAuthGuard,
			],
		}).compile();

		tokenService = testingModule.get<TokenService>(TokenService);
		reflector = testingModule.get<Reflector>(Reflector);
		sut = testingModule.get<JwtAuthGuard>(JwtAuthGuard);
	});

	it('should be defined', (): void => {
		expect(tokenService).toBeDefined();
		expect(reflector).toBeDefined();
		expect(sut).toBeDefined();
	});

	it('should throw an UnauthorizedException if no authentication token is provided', async (): Promise<void> => {
		jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce(false);

		const ctx = createMockExecutionCtx({
			request: {
				headers: {},
			},
		});

		await expect(sut.canActivate(ctx)).rejects.toThrow(
			new UnauthorizedException(
				getJwtErrorMessage('JsonWebTokenNotFoundError'),
			),
		);
		expect(ctx.switchToHttp().getRequest<Request>().headers).toStrictEqual({});
	});

	it('should throw an UnauthorizedException if an invalid authentication token is provided', async (): Promise<void> => {
		jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce(false);
		jest
			.spyOn(tokenService, 'verifyToken')
			.mockRejectedValueOnce(new Error('InvalidAuthenticationTokenSignature'));

		const ctx = createMockExecutionCtx({
			request: {
				headers: {
					authorization: 'Bearer invalidToken',
				},
			},
		});

		await expect(sut.canActivate(ctx)).rejects.toThrow(
			new UnauthorizedException('Invalid authentication token'),
		);
	});
});
