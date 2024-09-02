export const environments = [
	'DEVELOPMENT',
	'PRODUCTION',
	'STAGING',
	'TESTING',
] as const;

export type NODE_ENV = (typeof environments)[number];
