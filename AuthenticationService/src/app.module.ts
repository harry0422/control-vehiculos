import { Module, DynamicModule, NotFoundException, OnApplicationShutdown } from '@nestjs/common';
import { MikroORM } from 'mikro-orm';
import { MikroOrmModule, MikroOrmModuleOptions } from 'nestjs-mikro-orm';
import { DatabaseHelper } from './helpers/database.helper';
import { Usuario } from './usuarios/usuario.entity';
import { UsuarioController } from './usuarios/usuario.controller';
import UsuarioService from './usuarios/usuario.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './usuarios/constants';
  
@Module({
	imports: [
	MikroOrmModule.forFeature({
		entities: [Usuario],
	}),
	PassportModule,
	JwtModule.register({
		secret: jwtConstants.secret,
		signOptions: {expiresIn: '60s'}
	})
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