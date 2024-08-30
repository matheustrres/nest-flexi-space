import { Injectable } from '@nestjs/common';
import { sign, verify } from '@node-rs/jsonwebtoken';

import { type JwtPayload } from '@/@core/types';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { EnvService } from '@/shared/modules/env/env.service';

@Injectable()
export class TokenService {
	constructor(private readonly envService: EnvService) {}

	async signToken(payload: JwtPayload) {
		return sign(payload, this.envService.getKeyOrThrow('JWT_PUBLIC_KEY'));
	}

	async verifyToken(token: string): Promise<JwtPayload> {
		return verify(
			token,
			this.envService.getKeyOrThrow('JWT_PRIVATE_KEY'),
		) as unknown as JwtPayload;
	}
}
