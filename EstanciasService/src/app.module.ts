import { Module, DynamicModule, NotFoundException, OnApplicationShutdown } from '@nestjs/common';
import { MikroORM } from 'mikro-orm';
import { MikroOrmModule, MikroOrmModuleOptions } from 'nestjs-mikro-orm';
import { DatabaseHelper } from './helpers/database.helper';
import { EstanciaController } from './estancias/estancia.controller';
import { EstanciaService } from './estancias/estancia.service';
import { Estancia } from './estancias/estancia.entity';
  
@Module({
	imports: [
	MikroOrmModule.forFeature({
		entities: [Estancia],
	}),
	],
	providers: [EstanciaService, DatabaseHelper],
	controllers: [EstanciaController],
})

export class AppModule implements OnApplicationShutdown {
	constructor(private orm: MikroORM) {}

	static register(options?: {
	mikroOrmOptions?: MikroOrmModuleOptions;
	}): DynamicModule {
	return {
		module: AppModule,
		imports: [
		MikroOrmModule.forRoot({
			entities: [Estancia],

			type: 'mongo',
			clientUrl: 'mongodb://192.168.99.100:27017/vehiculos',
			findOneOrFailHandler: () => new NotFoundException(),
			...options?.mikroOrmOptions,
		}),
		],
	};
	}

	async onApplicationShutdown(signal?: string | undefined): Promise<void> {
	await this.orm.close();
	}
}