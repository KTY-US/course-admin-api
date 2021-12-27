import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
	constructor(private sequelize: Sequelize) {}

	getHello(): string {
		try {
			return 'Hello World with Nestjs!';
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
