import { REGEX, MESSAGES } from './../../utils/app.utils';
import { IsEnum, IsNotEmpty, Length, Matches } from 'class-validator';
import { ENUM } from 'sequelize';

export class AdminCreateDto {
	@IsNotEmpty()
	@Length(8, 32)
	@Matches(REGEX.USERNAME_RULE, { message: MESSAGES.USERNAME_RULE_MESSAGE })
	username: string;

	// @IsNotEmpty()
	// @IsEnum(ENUM('admin', 'manager'))
	// role: string;

	firstName: string;
	lastName: string;
}
