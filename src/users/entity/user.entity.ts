import { DataTypes } from 'sequelize';
import { Column, Model, Table, HasMany } from 'sequelize-typescript';

import { Course } from 'src/courses/entity/course.entity';

@Table
export class User extends Model {
	@Column({
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true
	})
	id: string;

	@Column({
		defaultValue: ''
	})
	userCode: string;

	@Column({
		allowNull: false,
		unique: true
	})
	email: string;

	@Column({
		defaultValue: 'Pass@12345',
		allowNull: false
	})
	password: string;

	@Column({
		defaultValue: 'First',
		allowNull: false
	})
	firstName: string;

	@Column({
		defaultValue: 'Last',
		allowNull: false
	})
	lastName: string;

	@Column({
		type: DataTypes.ENUM('active', 'inactive'),
		defaultValue: 'inactive',
		allowNull: false
	})
	status: string;

	@HasMany(() => Course)
	courses: Course[];
}
