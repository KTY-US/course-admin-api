import { IsDefined, IsString } from 'class-validator';

export class UserLoginDto {
	@IsString()
	@IsDefined()
	username: string;

	@IsString()
	@IsDefined()
	password: string;
}
