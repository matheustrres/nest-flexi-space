import { z } from 'zod';

import { NODE_ENV } from '@/@core/consts/node-env';

export const envSchema = z.object({
	PORT: z.coerce.number().optional().default(3333),
	NODE_ENV: z.nativeEnum(NODE_ENV),
});

export type Env = z.infer<typeof envSchema>;
