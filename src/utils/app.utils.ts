import { HttpStatus, ValidationPipe } from '@nestjs/common';

const PASSWORD_RULE = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const UUID_v1 = /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
const UUID_v2 = /^[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
const UUID_v3 = /^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
const UUID_v4 = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
const UUID_v5 = /^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

const PASSWORD_RULE_MESSAGE =
	'Password should have 1 upper case, lowcase letter along with a number and special character.';

const UUID_RULE_MESSAGE = 'ID should be a valid id';

const VALIDATION_PIPE = new ValidationPipe({
	errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
});

export const REGEX = {
	PASSWORD_RULE,
	UUID_v1,
	UUID_v2,
	UUID_v3,
	UUID_v4,
	UUID_v5
};

export const MESSAGES = {
	PASSWORD_RULE_MESSAGE,
	UUID_RULE_MESSAGE
};

export const SETTINGS = {
	VALIDATION_PIPE
};
