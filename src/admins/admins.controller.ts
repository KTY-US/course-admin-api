import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, Param, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';

import { AdminCreateDto } from './dtos/admin-create.dto';
import { Admin } from './entity/admin.entity';
import { AdminsService } from './admins.service';
import { ManagerCreateDto } from './dtos/manager-create.dto';

@Controller('admins')
export class AdminsController {
	constructor(private readonly adminsService: AdminsService) {}

	@Get()
	getAllCourses(
		@Query('page') page: string,
		@Query('rowsPerPage') rowsPerPage: string,
		@Query('sortMode') sortMode: string,
		@Query('search') search: string
	): Promise<{ admins: Admin[]; total: number }> {
		try {
			return this.adminsService.getAllAdmins(+page, +rowsPerPage, sortMode, search);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Get(':id')
	@UseGuards(AuthGuard('jwt'))
	async getUserDetails(@Param('id') userId: string): Promise<Admin> {
		try {
			return this.adminsService.getAdminDetail(userId);
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

	@Post('create-a-manager')
	@UsePipes(ValidationPipe)
	async createNewManagerAccount(@Body() data: ManagerCreateDto): Promise<void> {
		try {
			return this.adminsService.createManagerAccount(data);
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
