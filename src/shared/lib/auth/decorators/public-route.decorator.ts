import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_ROUTE = 'isPublicRoute';
export const IsPublicRoute = () => SetMetadata(IS_PUBLIC_ROUTE, true);
