import z from 'zod';

import { roles } from '@/@core/consts/role';

import { ZodValidationPipe } from '@/shared/lib/pipes/zod-validation.pipe';

const createUserDto = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	role: z.enum(roles).default('USER'),
});

export type CreateUserDto = z.infer<typeof createUserDto>;

export const CreateUserDtoBodyPipe = new ZodValidationPipe(createUserDto);
