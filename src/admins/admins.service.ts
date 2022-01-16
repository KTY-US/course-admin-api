import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
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
		// const check = this.checkManager(accountId);
		// if (check) {
		let myOrder = sequelize.literal('username ASC');

		if (sortMode === 'time-asc') {
			myOrder = sequelize.literal('createAt ASC');
		} else if (sortMode === 'time-desc') {
			myOrder = sequelize.literal('createAt DESC');
		}

		const accounts = this.adminModel.findAll({
			attributes: { exclude: ['updateAt'] },
			order: myOrder
		});
		return accounts;
		// } else {
		// 	throw new BadRequestException('Do not have permission!');
		// }
	}

	/**
	 * Lấy thông tin chi tiết tài khoản
	 * @param accountId
	 * @returns
	 */
	async getAdminAccountDetail(accountId: string): Promise<Admin> {
		const account = await this.adminModel.findOne({
			where: { id: accountId },
			attributes: { exclude: ['updateAt'] }
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
}
