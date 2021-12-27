import { registerAs } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize/types';

export default registerAs('sequelize.config', (): SequelizeModuleOptions => {
	const dialect = process.env.DB_DIALECT as Dialect;

	return {
		dialect: dialect,
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		autoLoadModels: true,
		synchronize: true
	};
});
