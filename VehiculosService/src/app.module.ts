import { Module, DynamicModule, NotFoundException, OnApplicationShutdown } from '@nestjs/common';
import { MikroORM } from 'mikro-orm';
import { MikroOrmModule, MikroOrmModuleOptions } from 'nestjs-mikro-orm';
import { DatabaseHelper } from './helpers/database.helper';
import { VehiculoController } from './vehiculos/vehiculo.controller';
import { VehiculoService } from './vehiculos/vehiculo.service';
import { Vehiculo } from './vehiculos/vehiculo.entity';
  
@Module({
	imports: [
	MikroOrmModule.forFeature({
		entities: [Vehiculo],
	}),
	],
	providers: [VehiculoService, DatabaseHelper],
	controllers: [VehiculoController],
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
			entities: [Vehiculo],

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