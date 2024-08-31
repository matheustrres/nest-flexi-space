import { prismaClient } from '../prisma.client';

export async function resetDb(): Promise<void> {
	try {
		await prismaClient.$transaction([
			prismaClient.user.deleteMany(),
			prismaClient.reservation.deleteMany(),
			prismaClient.room.deleteMany(),
		]);
	} catch (error) {
		console.error('Error while reseting database: ', error);
		throw error;
	}
}
