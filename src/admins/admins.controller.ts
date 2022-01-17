import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, Param, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';

import { AdminCreateDto } from './dtos/admin-create.dto';
import { Admin } from './entity/admin.entity';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
	constructor(private readonly adminsService: AdminsService) {}

	@Get('all/:accountId')
	@UseGuards(AuthGuard('jwt'))
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

	@Get('account-detail/:accountId')
	@UseGuards(AuthGuard('jwt'))
	async getAdminAccountDetail(@Param('accountId') accountId: string): Promise<Admin> {
		try {
			return this.adminsService.getAdminAccountDetail(accountId);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Get('check-username')
	@UseGuards(AuthGuard('jwt'))
	async checkUsername(@Req() req: Request): Promise<boolean> {
		try {
			const { username } = req.body;
			return this.adminsService.checkExistedUsername(username);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Post('create')
	@UseGuards(AuthGuard('jwt'))
	@UsePipes(ValidationPipe)
	async createNewAdminAccount(@Body() data: AdminCreateDto): Promise<void> {
		try {
			return this.adminsService.createAdminAccount(data);
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
