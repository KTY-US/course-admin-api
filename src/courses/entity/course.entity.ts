import { DataTypes } from 'sequelize';
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import { User } from 'src/users/entity/user.entity';

@Table
export class Course extends Model {
	@Column({
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true
	})
	id: string;

	@Column({
		defaultValue: 'Course name',
		allowNull: false
	})
	courseName: string;

	@Column({
		defaultValue: '',
		allowNull: false
	})
	imagePath: string;

	@Column({})
	courseCode: string;

	@Column({
		type: DataTypes.UUID,
		allowNull: false
	})
	code: string;

	@Column({
		type: DataTypes.INTEGER,
		defaultValue: 2021,
		allowNull: false
	})
	schoolYear: number;

	@ForeignKey(() => User)
	@Column({
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false
	})
	ownerId: string;

	@BelongsTo(() => User)
	owner: User;
}
