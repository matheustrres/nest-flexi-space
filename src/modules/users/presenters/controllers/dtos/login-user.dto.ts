import z from 'zod';

import { ZodValidationPipe } from '@/shared/lib/pipes/zod-validation.pipe';

const loginUserDto = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type LoginUserDto = z.infer<typeof loginUserDto>;

export const LoginUserDtoBodyPipe = new ZodValidationPipe(loginUserDto);
