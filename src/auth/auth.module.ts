import { DynamicModule, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { Admin } from './../admins/entity/admin.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({})
export class AuthModule {
	static forRoot(jwt_secret: string): DynamicModule {
		return {
			imports: [
				SequelizeModule.forFeature([Admin]),
				JwtModule.register({ secret: jwt_secret, signOptions: { expiresIn: '1h' } })
			],
			controllers: [AuthController],
			providers: [AuthService],
			module: AuthModule,
			exports: [AuthService]
		};
	}
}
