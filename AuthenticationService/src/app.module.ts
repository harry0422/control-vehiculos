import { Module, DynamicModule, NotFoundException, OnApplicationShutdown } from '@nestjs/common';
import { MikroORM } from 'mikro-orm';
import { MikroOrmModule, MikroOrmModuleOptions } from 'nestjs-mikro-orm';
import { DatabaseHelper } from './helpers/database.helper';
import { Usuario } from './usuarios/usuario.entity';
import { UsuarioController } from './usuarios/usuario.controller';
import UsuarioService from './usuarios/usuario.service';
  
@Module({
	imports: [
	MikroOrmModule.forFeature({
		entities: [Usuario],
	}),
	],
	providers: [UsuarioService, DatabaseHelper],
	controllers: [UsuarioController],
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
			entities: [Usuario],

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