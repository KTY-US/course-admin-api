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
		allowNull: false
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
		defaultValue: 'admin',
		allowNull: false
	})
	role: string;
}
