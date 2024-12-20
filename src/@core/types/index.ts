import { type ROLE } from '@/@core/consts/role';

export type JwtPayload = {
	sub: string;
	role: ROLE;
};

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
