import z from 'zod';

import { ZodValidationPipe } from '@/shared/lib/pipes/zod-validation.pipe';

const createRoomDto = z.object({
	name: z.string(),
	description: z.string(),
	location: z.string(),
	capacity: z.coerce.number(),
	availability: z.array(z.date()).optional(),
});

export type CreateRoomDto = z.infer<typeof createRoomDto>;

export const CreateRoomDtoBodyPipe = new ZodValidationPipe(createRoomDto);
