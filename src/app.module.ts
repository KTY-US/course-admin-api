import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import configDatabase from './config/database.config';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', load: [configDatabase] }),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: configDatabase
		}),
		UsersModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
