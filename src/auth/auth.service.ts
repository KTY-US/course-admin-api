import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { Admin } from './../admins/entity/admin.entity';
import { AuthDto } from './dtos/auth.dto';
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
}
