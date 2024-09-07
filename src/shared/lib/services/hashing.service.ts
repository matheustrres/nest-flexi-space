import { randomBytes } from 'node:crypto';

import { Injectable } from '@nestjs/common';
import { hash, compare } from '@node-rs/bcrypt';

type CompareStringsOptions = {
	hashedStr: string;
	plainStr: string;
};

@Injectable()
export class HashingService {
	async hashString(str: string) {
		const salt = randomBytes(16);
		return hash(str, null, salt);
	}

	async compareStrings({
		hashedStr,
		plainStr,
	}: CompareStringsOptions): Promise<boolean> {
		return compare(plainStr, hashedStr);
	}
}
