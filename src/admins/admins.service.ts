import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';

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
		await this.adminModel.create(data);
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
	async getAllAdminAccounts(sortMode: string): Promise<Admin[]> {
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
	}

	async getAdminAccountDetail(accountId: string): Promise<Admin> {
		const account = await this.adminModel.findOne({
			where: { id: accountId },
			attributes: { exclude: ['updateAt'] }
		});

		if (account) return account;
		throw new BadRequestException('Account does not exist!');
	}
}
