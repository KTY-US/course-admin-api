import { Body, Controller, Get, Param, Put, Query, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from './entity/user.entity';
import { UsersService, ICheckExistedResult } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	getAllCourses(
		@Query('page') page: string,
		@Query('rowsPerPage') rowsPerPage: string,
		@Query('sortMode') sortMode: string,
		@Query('search') search: string
	): Promise<{ users: User[]; total: number }> {
		try {
			return this.usersService.getAllUsers(+page, +rowsPerPage, sortMode, search);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Get(':id')
	@UseGuards(AuthGuard('jwt'))
	async getUserDetails(@Param('id') userId: string): Promise<User> {
		try {
			return this.usersService.getUserDetail(userId);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Post('check-code/:id')
	async checkExistedUserCode(@Param('id') userId: string, @Body('code') code: string): Promise<ICheckExistedResult> {
		try {
			return this.usersService.checkExistedUserCode(userId, code);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Put('change-code/:id')
	@UseGuards(AuthGuard('jwt'))
	async changeUserCode(@Param('id') userId: string, @Body('newCode') newCode: string): Promise<boolean> {
		try {
			return this.usersService.changeUserCode(userId, newCode);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Put('change-lock-status/:id')
	@UseGuards(AuthGuard('jwt'))
	async changeUserLockStatus(@Param('id') userId: string): Promise<boolean> {
		try {
			return this.usersService.changeUserLockStatus(userId);
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
