import { z } from 'zod';

import { NODE_ENV } from '@/@core/consts/node-env';

export const envSchema = z.object({
	PORT: z.coerce.number().optional().default(3333),
	NODE_ENV: z.nativeEnum(NODE_ENV),
	PG_USER: z.string(),
	PG_PASS: z.string(),
	PG_DB: z.string(),
	PG_PORT: z.coerce.number().optional().default(5432),
	PG_HOST: z.string().optional().default('localhost'),
	PGADMIN_DEFAULT_EMAIL: z.string(),
	DATABASE_URL: z.string().startsWith('postgresql://'),
	JWT_PRIVATE_KEY: z.string(),
	JWT_PUBLIC_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;
