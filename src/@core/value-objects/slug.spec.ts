import { Slug } from './slug';

describe(Slug.name, (): void => {
	it('should create a new slug from a text', (): void => {
		const slug = Slug.createFromText('Just a text');

		expect(slug.props.value).toEqual('just-a-text');
	});
});
