import { Body, Controller, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { UserLoginDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signin')
	@UseGuards(AuthGuard('local'))
	@UsePipes(ValidationPipe)
	async signIn(@Body() userLogin: UserLoginDto): Promise<AuthDto> {
		try {
			return this.authService.signIn(userLogin);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Post('changePassword/:userId')
	@UsePipes(ValidationPipe)
	async changePassword2(@Body() passwordForm: ChangePasswordDto, @Param('userId') userId: string): Promise<void> {
		try {
			return this.authService.changePassword(passwordForm, userId);
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
