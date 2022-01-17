import { IsNotEmpty, Length, Matches } from 'class-validator';

import { MESSAGES, REGEX } from 'src/utils/app.utils';

export class ChangePasswordDto {
	@IsNotEmpty()
	@Length(8, 255)
	@Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
	password: string;

	@IsNotEmpty()
	@Length(8, 255)
	@Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
	newPassword: string;

	@IsNotEmpty()
	@Length(8, 255)
	@Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
	confirmNewPassword: string;
}
