import { Injectable, BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { Admin } from './../admins/entity/admin.entity';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: 'username' });
	}

	async validate(username: string, password: string): Promise<Admin | boolean> {
		const user = await this.authService.authenticate(username, password);
		if (!user) {
			throw new BadRequestException('Password is incorrect!');
		}

		return user;
	}
}
