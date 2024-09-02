import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Reflector } from '@nestjs/core';
import { type Request } from 'express';
import { type IncomingHttpHeaders } from 'http';

import { getJwtErrorMessage, type JwtError } from '../errors/jwt';

import { type JwtPayload } from '@/@core/types';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { TokenService } from '@/modules/users/services/token.service';

import { IS_PUBLIC_ROUTE } from '@/shared/lib/auth/decorators/public-route.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(
		private readonly tokenService: TokenService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		if (this.#isPublicRoute(ctx, this.reflector)) return true;

		const request = ctx.switchToHttp().getRequest<Request>();
		const authToken = this.#extractAuthTokenFromBearer(request.headers);

		if (!authToken) {
			throw new UnauthorizedException(
				getJwtErrorMessage('JsonWebTokenNotFoundError'),
			);
		}

		let payload: JwtPayload;

		try {
			payload = await this.tokenService.verifyToken(authToken);
		} catch (error) {
			const errName = (error as Error).name;
			throw new UnauthorizedException(getJwtErrorMessage(errName as JwtError));
		}

		request.user = payload;

		return true;
	}

	#extractAuthTokenFromBearer(
		headers: IncomingHttpHeaders,
	): string | undefined {
		const [type, token] = headers.authorization?.split(' ') ?? [];

		return type === 'Bearer' ? token : undefined;
	}

	#isPublicRoute(ctx: ExecutionContext, reflector: Reflector): boolean {
		return reflector.getAllAndOverride<boolean, string>(IS_PUBLIC_ROUTE, [
			ctx.getHandler(),
			ctx.getClass(),
		]);
	}
}
