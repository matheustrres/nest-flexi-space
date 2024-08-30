import { type EntityId } from './entity-id';

export type CreateEntityProps<Props> = {
	id: EntityId;
	props: Props;
};

export abstract class Entity<Props> {
	readonly id: EntityId;
	readonly createdAt: Date;

	protected readonly props!: Props;

	constructor({ id, props }: CreateEntityProps<Props>) {
		this.props = props;
		this.id = id;
		this.createdAt = new Date();
	}

	render(): Props {
		return Object.freeze<Props>(this.props);
	}
}
