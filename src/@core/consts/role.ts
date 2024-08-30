import { type ObjectValues } from '../types';

export const ROLE = {
	USER: 'USER',
	ADMIN: 'ADMIN',
} as const;

export type ROLE = ObjectValues<typeof ROLE>;
