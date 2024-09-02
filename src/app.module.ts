import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HealthModule } from '@/modules/health/health.module';
import { UsersModule } from '@/modules/users/users.module';

import { JwtAuthGuard } from '@/shared/lib/auth/guards/jwt-auth.guard';
import { GlobalExceptionFilter } from '@/shared/lib/exceptions/filters/global-exception-filter';
import { ZodExceptionFilter } from '@/shared/lib/exceptions/filters/zod-exception-filter';
import { EnvModule } from '@/shared/modules/env/env.module';
import { PrismaModule } from '@/shared/modules/prisma/prisma.module';

@Module({
	imports: [EnvModule, HealthModule, PrismaModule, UsersModule],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: GlobalExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: ZodExceptionFilter,
		},
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {}
