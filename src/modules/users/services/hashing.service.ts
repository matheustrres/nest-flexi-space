import { hash, genSalt, compare } from '@node-rs/bcrypt';

type CompareStringsOptions = {
	hashedString: string;
	plainStr: string;
};

export class HashingService {
	async hashString(str: string) {
		const salt = await genSalt(9);
		return hash(str, null, Buffer.from(salt));
	}

	async compareStrings({
		hashedString,
		plainStr,
	}: CompareStringsOptions): Promise<boolean> {
		return compare(plainStr, hashedString);
	}
}
