import { type ROLE } from '@/@core/consts/role';

export type ObjectValues<T> = T[keyof T];
export type JwtPayload = {
	sub: string;
	role: ROLE;
};
