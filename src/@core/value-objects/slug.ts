import { ValueObject } from '../value-object';

export type SlugProps = {
	value: string;
};

export class Slug extends ValueObject<SlugProps> {
	private constructor(value: string) {
		super({ value });
	}

	static create(slug: string): Slug {
		return new Slug(slug);
	}

	static createFromText(text: string): Slug {
		const slugText = text
			.normalize('NFKD')
			.toLowerCase()
			.trim()
			.replace(/\s+/g, '-') // replace every white space
			.replace(/[^\w-]+/g, '') // replace everything that are not words
			.replace(/_/g, '-') // replace every underline
			.replace(/--+/g, '-') // replace every double "--"
			.replace(/-$/g, ''); // replace every text that ends with "-"

		return new Slug(slugText);
	}
}
