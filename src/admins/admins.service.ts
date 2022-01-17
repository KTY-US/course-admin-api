import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';

import * as bcrypt from 'bcrypt';

import { AdminCreateDto } from './dtos/admin-create.dto';
import { Admin } from './entity/admin.entity';

@Injectable()
export class AdminsService {
	constructor(
		@InjectModel(Admin)
		private adminModel: typeof Admin
	) {}

	/**
	 * Hàm tạo tài khoản admin
	 * @param data
	 */
	async createAdminAccount(data: AdminCreateDto): Promise<void> {
		if (data.firstName.length === 0) {
			data.firstName = 'Admin';
		}
		if (data.lastName.length === 0) {
			data.lastName = 'Last';
		}
		const hashedPassword = bcrypt.hashSync('Pass@12345', 12);

		await this.adminModel.create({
			username: data.username,
			firstName: data.firstName,
			lastName: data.lastName,
			password: hashedPassword
		});
	}

	async checkExistedUsername(username: string): Promise<boolean> {
		const isExistAccount = this.adminModel.findOne({ where: { username } });

		if (isExistAccount) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Ham lấy danh sách admin account
	 * @returns
	 */
	async getAllAdminAccounts(accountId: string, sortMode?: string): Promise<Admin[]> {
		let myOrder = sequelize.literal('username ASC');

		if (sortMode === 'time-asc') {
			myOrder = sequelize.literal('createdAt ASC');
		} else if (sortMode === 'time-desc') {
			myOrder = sequelize.literal('createdAt DESC');
		}

		const accounts = this.adminModel.findAll({
			attributes: { exclude: ['updatedAt'] },
			order: myOrder
		});
		return accounts;
	}

	/**
	 * Lấy thông tin chi tiết tài khoản
	 * @param accountId
	 * @returns
	 */
	async getAdminAccountDetail(accountId: string): Promise<Admin> {
		const account = await this.adminModel.findOne({
			where: { id: accountId },
			attributes: { exclude: ['updatedAt'] }
		});

		if (account) return account;
		throw new BadRequestException('Account does not exist!');
	}

	/**
	 * Kiểm tra tài khoản là manager
	 * @param accountId
	 * @returns
	 */
	async checkManager(accountId: string): Promise<boolean> {
		const account = await this.adminModel.findOne({ where: { id: accountId } });

		if (account) {
			if (account.role === 'manager') return true;
			else {
				return false;
			}
		}
		throw new NotFoundException('Admin account does not exist!');
	}

	/**
	 * Kiểm tra tài khoản là manager
	 * @param accountId
	 * @returns
	 */
	async checkIsAdmin(accountId: string): Promise<boolean> {
		const account = await this.adminModel.findOne({ where: { id: accountId } });

		if (account) {
			return true;
		}
		throw new NotFoundException('Admin account does not exist!');
	}

	/**
	 * Hàm lấy danh sách admin
	 * @param sortMode
	 * @returns
	 */
	async getAllAdmins(
		page: number,
		rowsPerPage: number,
		sortMode?: string,
		searchString?: string
	): Promise<{ admins: Admin[]; total: number }> {
		let myOrder = sequelize.literal('username ASC');

		if (sortMode === 'time-asc') {
			myOrder = sequelize.literal('createdAt ASC');
		} else if (sortMode === 'time-desc') {
			myOrder = sequelize.literal('createdAt DESC');
		}

		let admins: Admin[];

		try {
			if (searchString !== '') {
				admins = await this.adminModel.findAll({
					where: {
						[Op.or]: [
							{ username: { [Op.regexp]: searchString } },
							{ firstName: { [Op.regexp]: searchString } },
							{ lastName: { [Op.regexp]: searchString } }
						]
					},
					attributes: { exclude: ['updatedAt'] },
					order: myOrder
				});
			} else {
				admins = await this.adminModel.findAll({
					attributes: { exclude: ['updatedAt'] },
					order: myOrder
				});
			}
		} catch {
			admins = [];
		}

		const total = admins.length;
		const startIndex = (page - 1) * rowsPerPage;
		if (startIndex < total && rowsPerPage > 0) {
			admins = admins.slice((page - 1) * rowsPerPage, page * rowsPerPage);
		}

		return { admins, total };
	}

	/**
	 * Hàm lấy thông tin chi tiết một admin
	 * @param userId
	 * @returns
	 */
	async getAdminDetail(userId: string): Promise<Admin> {
		return await this.adminModel.findOne({ where: { id: userId }, attributes: { exclude: ['updatedAt'] } });
	}
}
