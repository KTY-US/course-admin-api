import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';
import bcrypt from 'bcrypt';
@Table
export class Admin extends Model {
	@Column({
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true
	})
	id: string;

	@Column({
		allowNull: false,
		unique: true
	})
	username: string;

	@Column({
		defaultValue: 'Pass@12345',
		allowNull: false,
		set(value: string) {
			const hash = bcrypt.hashSync(value, 10);
			this.setDataValue('password', hash);
		}
	})
	password: string;

	@Column({
		defaultValue: 'Admin',
		allowNull: true
	})
	firstName: string;

	@Column({
		defaultValue: 'Last',
		allowNull: true
	})
	lastName: string;

	@Column({
		type: DataTypes.ENUM('admin', 'manager'),
		allowNull: false
	})
	role: string;
}
