const JwtErrorOrigin = [
	'JsonWebTokenError',
	'JsonWebTokenNotFoundError',
	'TokenExpiredError',
] as const;

export type JwtError = (typeof JwtErrorOrigin)[number];

export function getJwtErrorMessage(error: JwtError) {
	return (
		{
			JsonWebTokenError: 'Invalid authentication token signature',
			JsonWebTokenNotFoundError:
				'No authentication token found in the authentication header',
			TokenExpiredError: 'Authentication token is expired',
		}[error] || 'Invalid authentication token'
	);
}
