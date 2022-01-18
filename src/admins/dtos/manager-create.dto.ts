import { REGEX, MESSAGES } from './../../utils/app.utils';
import { IsNotEmpty, Length, Matches } from 'class-validator';

export class ManagerCreateDto {
	@IsNotEmpty()
	@Length(5, 32)
	@Matches(REGEX.USERNAME_RULE, { message: MESSAGES.USERNAME_RULE_MESSAGE })
	username: string;

	@IsNotEmpty()
	@Length(8, 255)
	@Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
	password: string;

	// @IsNotEmpty()
	// @IsEnum(ENUM('admin', 'manager'))
	// role: string;

	firstName: string;
	lastName: string;
}
