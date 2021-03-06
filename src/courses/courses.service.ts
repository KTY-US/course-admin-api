import { User } from './../users/entity/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import sequelize, { Op } from 'sequelize';

import { Course } from './entity/course.entity';

@Injectable()
export class CoursesService {
	constructor(
		@InjectModel(Course)
		private courseModel: typeof Course
	) {}

	/**
	 * Ham lay danh sach cac khoa hoc
	 * @param accountId
	 * @param page
	 * @param rowsPerPage
	 * @param sortMode
	 * @returns
	 */
	async getAllCourses(
		accountId: string,
		page: number,
		rowsPerPage: number,
		sortMode: string,
		searchString?: string
	): Promise<{ courses: Course[]; total: number }> {
		let myOrder = sequelize.literal('createdAt DESC');

		if (sortMode === 'time-asc') {
			myOrder = sequelize.literal('createdAt ASC');
		}
		let courses: Course[] = [];
		try {
			if (searchString && searchString !== '') {
				courses = await this.courseModel.findAll({
					include: [
						{
							model: User,
							as: 'owner',
							attributes: {
								exclude: ['userCode', 'password', 'status', 'createdAt', 'updatedAt']
							}
						}
					],
					where: {
						courseName: { [Op.regexp]: searchString }
					},
					attributes: { exclude: ['imagePath', 'updatedAt'] },
					order: myOrder
				});
			} else {
				courses = await this.courseModel.findAll({
					include: [
						{
							model: User,
							as: 'owner',
							attributes: {
								exclude: ['userCode', 'password', 'status', 'createdAt', 'updatedAt']
							}
						}
					],
					attributes: { exclude: ['imagePath', 'updatedAt'] },
					order: myOrder
				});
			}
		} catch {}

		const total = courses.length;
		const startIndex = (page - 1) * rowsPerPage;
		if (startIndex < total && rowsPerPage > 0) {
			courses = courses.slice((page - 1) * rowsPerPage, page * rowsPerPage);
		}

		return { courses, total };
	}

	/**
	 * Ham doc thong tin chi tiet mot khoa hoc
	 * @param courseId
	 * @returns
	 */
	async getCourseDetail(courseId: string): Promise<Course> {
		const course = await this.courseModel.findOne({
			where: { id: courseId },
			include: [
				{
					model: User,
					as: 'owner',
					attributes: {
						exclude: ['password', 'status', 'createdAt', 'updatedAt']
					}
				}
			],
			attributes: { exclude: ['updatedAt'] }
		});

		if (course) {
			return course;
		}
		throw new NotFoundException('Course does not exist!');
	}

	/**
	 * Ham doc thong tin chi tiet mot khoa hoc
	 * @param courseId
	 * @returns
	 */
	async deleteCourse(courseId: string): Promise<void> {
		const course = await this.courseModel.findOne({
			where: { id: courseId }
		});

		if (course) {
			course.destroy();
		}
		throw new NotFoundException('Course does not exist!');
	}
}
