import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HealthModule } from '@/modules/health/health.module';

import { GlobalExceptionFilter } from '@/shared/lib/exceptions/filters/global-exception-filter';
import { ZodExceptionFilter } from '@/shared/lib/exceptions/filters/zod-exception-filter';
import { EnvModule } from '@/shared/modules/env/env.module';

@Module({
	imports: [EnvModule, HealthModule],
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
	],
})
export class AppModule {}
