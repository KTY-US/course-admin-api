import { AdminCreateDto } from './dtos/admin-create.dto';
import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';

import { Admin } from './entity/admin.entity';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
	constructor(private readonly adminsService: AdminsService) {}

	@Get('/all/:accountId')
	async getAllAdminAccounts(
		@Param('accountId') accountId: string,
		@Query('sortMode') sortMode?: string
	): Promise<Admin[]> {
		try {
			return this.adminsService.getAllAdminAccounts(accountId, sortMode);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Get('/account-detail/:accountId')
	async getAdminAccountDetail(
		@Param('accountId') accountId: string
		// @Query('watchAccountId') watchAccountId: string
	): Promise<Admin> {
		try {
			return this.adminsService.getAdminAccountDetail(accountId);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Get('/check-username')
	async checkUsername(@Req() req: Request): Promise<boolean> {
		try {
			const { username } = req.body;
			return this.adminsService.checkExistedUsername(username);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Post('/create')
	async createNewAdminAccount(@Body() data: AdminCreateDto): Promise<void> {
		try {
			return this.adminsService.createAdminAccount(data);
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
