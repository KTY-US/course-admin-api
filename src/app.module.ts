import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';
import configDatabase from './config/database.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', load: [configDatabase] }),
		AuthModule.forRoot(process.env.JWT_SECRET_KEY),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: configDatabase
		}),
		JwtModule.register({ secret: process.env.JWT_SECRET_KEY, signOptions: { expiresIn: '1h' } }),
		UsersModule,
		CoursesModule,
		AdminsModule
	],
	controllers: [AppController],
	providers: [AppService, JwtStrategy, LocalStrategy]
})
export class AppModule {}
