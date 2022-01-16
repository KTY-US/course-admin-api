import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';

import { User } from './entity/user.entity';

/**
 * Interface chứa kết quá trả về của hàm kiểm tra tồn tại
 */
export interface ICheckExistedResult {
	isExisted: boolean;
	usedBy?: string;
}

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User)
		private userModal: typeof User
	) {}

	/**
	 * Hàm lấy danh sách user
	 * @param sortMode
	 * @returns
	 */
	async getAllUsers(page: number, rowsPerPage: number, sortMode?: string): Promise<{ users: User[]; total: number }> {
		let myOrder = sequelize.literal('email ASC');

		if (sortMode === 'time-asc') {
			myOrder = sequelize.literal('createdAt ASC');
		} else if (sortMode === 'time-desc') {
			myOrder = sequelize.literal('createdAt DESC');
		}

		let users = await this.userModal.findAll({ attributes: { exclude: ['updatedAt'] }, order: myOrder });
		const total = users.length;
		const startIndex = (page - 1) * rowsPerPage;
		if (startIndex < total && rowsPerPage > 0) {
			users = users.slice((page - 1) * rowsPerPage, page * rowsPerPage);
		}
		return { users, total };
	}

	/**
	 * Hàm kiểm tra userCode đã được sử dụng bởi tài khoản khác chưa
	 * @param userId
	 * @param userCode
	 * @returns trả về true nếu đã được sử dụng
	 */
	async checkExistedUserCode(userId: string, code: string): Promise<ICheckExistedResult> {
		if (code !== '') {
			const user = await this.userModal.findOne({ where: { code } });

			if (user) {
				if (user.id !== userId) {
					return { isExisted: true, usedBy: user.id };
				}
			}

			return { isExisted: false };
		}
		return { isExisted: false };
	}

	/**
	 * Hàm lấy thông tin chi tiết một user
	 * @param userId
	 * @returns
	 */
	async getUserDetail(userId: string): Promise<User> {
		return await this.userModal.findOne({ where: { id: userId }, attributes: { exclude: ['updatedAt'] } });
	}

	/**
	 * Hàm thay đổi userCode
	 * @param userId
	 * @param newCode
	 * @returns
	 */
	async changeUserCode(userId: string, newCode: string): Promise<boolean> {
		const user = await this.userModal.findOne({ where: { id: userId } });

		if (user) {
			if (user.userCode !== newCode) {
				await user.update({ userCode: newCode });
				return false;
			}
			return true;
		} else {
			throw new NotFoundException('User does not exist!');
		}
	}

	/**
	 * Hàm lock hoặc unlock tài khoản của user
	 * @param userId
	 * @returns
	 */
	async changeUserLockStatus(userId: string): Promise<boolean> {
		const user = await this.userModal.findOne({ where: { id: userId } });

		if (user) {
			if (user.status === 'blocked') {
				await user.update({ status: 'active' });
			} else if (user.status === 'active') {
				await user.update({ status: 'blocked' });
			} else {
				return false;
			}
			return true;
		} else {
			throw new NotFoundException('User does not exist!');
		}
	}
}
