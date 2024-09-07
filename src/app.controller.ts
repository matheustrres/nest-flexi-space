import { Controller, Get } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AppService } from './app.service';
import { IsPublicRoute } from './shared/lib/auth/decorators/public-route.decorator';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@IsPublicRoute()
	getHello(): string {
		return this.appService.getHello();
	}
}
