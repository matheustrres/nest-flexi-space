import { execSync } from 'child_process';

export async function runMigrations(): Promise<void> {
	try {
		execSync('npx prisma migrate deploy', {
			stdio: 'inherit',
		});
	} catch (error) {
		console.error('Error while running migrations: ', error);
		throw error;
	}
}