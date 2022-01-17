import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { Admin } from './../admins/entity/admin.entity';
import { AuthDto } from './dtos/auth.dto';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { UserLoginDto } from './dtos/signin.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(Admin)
		private adminModel: typeof Admin,
		private readonly jwtService: JwtService
	) {}
	/**
	 * Kiểm tra mật khẩu có khớp không
	 * @param username
	 * @param password
	 */
	async authenticate(username: string, password: string): Promise<Admin | boolean> {
		const user = await Admin.findOne({
			where: { username },
			attributes: { exclude: ['createdAt', 'updatedAt'] }
		});

		if (!user) throw new BadRequestException('User with this username does not exist!');

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (isPasswordCorrect) {
			return user;
		} else {
			return false;
		}
	}

	/**
	 * Xử lý đăng nhập với tài khoản email thông thường
	 * @param userLogin (email, password)
	 * @returns
	 */
	async signIn(userLogin: UserLoginDto): Promise<AuthDto> {
		const user = await Admin.findOne({
			where: { username: userLogin.username },
			attributes: { exclude: ['createdAt', 'updatedAt'] }
		});

		const token = this.jwtService.sign({ username: user.username, id: user.id });

		return {
			userId: user.id,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.role,
			token: token
		};
	}

	/**
	 * Đổi mật khẩu cho user
	 * @param passwordForm
	 * @returns
	 */
	async changePassword(passwordForm: ChangePasswordDto, userId: string): Promise<void> {
		const isExistUser = await this.adminModel.findOne({ where: { id: userId } });

		if (isExistUser) {
			const isPasswordCorrect = await bcrypt.compare(passwordForm.password, isExistUser.password);
			if (!isPasswordCorrect) {
				throw new BadRequestException('Old password is incorrect');
			} else {
				if (passwordForm.newPassword === passwordForm.confirmNewPassword) {
					const hashedPassword = bcrypt.hashSync(passwordForm.newPassword, 12);
					await this.adminModel.update({ password: hashedPassword }, { where: { id: userId } });
				} else {
					throw new BadRequestException('New password not match confirm new password');
				}
			}
		} else {
			throw new BadRequestException('User does not exist.');
		}
	}
}
