import { type ObjectValues } from '../types';

export const NODE_ENV = {
	DEVELOPMENT: 'DEVELOPMENT',
	PRODUCTION: 'PRODUCTION',
	STAGING: 'STAGING',
	TESTING: 'TESTING',
} as const;

export type NODE_ENV = ObjectValues<typeof NODE_ENV>;
