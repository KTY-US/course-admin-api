import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { User } from './entity/user.entity';

import { UsersService, ICheckExistedResult } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('all')
	async getAllUsers(@Query('sortMode') sortMode: string): Promise<User[]> {
		try {
			return this.usersService.getAllUsers(sortMode);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Get(':id')
	async getUserDetails(@Param('id') userId: string): Promise<User> {
		try {
			return this.usersService.getUserDetail(userId);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Get('check-code/:id')
	async checkExistedUserCode(@Param('id') userId: string, @Body('code') code: string): Promise<ICheckExistedResult> {
		try {
			return this.usersService.checkExistedUserCode(userId, code);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Put('change-code/:id')
	async changeUserCode(@Param('id') userId: string, @Body('newCode') newCode: string): Promise<boolean> {
		try {
			return this.usersService.changeUserCode(userId, newCode);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Put('change-lock-status/:id')
	async changeUserLockStatus(@Param('id') userId: string): Promise<boolean> {
		try {
			return this.usersService.changeUserLockStatus(userId);
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
