import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import sequelize from 'sequelize';

import { Course } from './entity/course.entity';

@Injectable()
export class CoursesService {
	constructor(
		@InjectModel(Course)
		private courseModel: typeof Course
	) {}

	async getAllCourses(
		accountId: string,
		page: number,
		rowsPerPage: number,
		sortMode?: string
	): Promise<{ courses: Course[]; total: number }> {
		let myOrder = sequelize.literal('createAt DESC');

		if (sortMode === 'time-asc') {
			myOrder = sequelize.literal('createAt ASC');
		} else if (sortMode === 'time-desc') {
			myOrder = sequelize.literal('createAt DESC');
		}

		let courses = await this.courseModel.findAll({ attributes: { exclude: ['updateAt'] }, order: myOrder });

		const total = courses.length;
		const startIndex = (page - 1) * rowsPerPage;
		if (startIndex < total && rowsPerPage > 0) {
			courses = courses.slice((page - 1) * rowsPerPage, page * rowsPerPage);
		}

		return { courses, total };
	}

	async getCourseDetail(courseId: string): Promise<Course> {
		const course = await this.courseModel.findOne({
			where: { id: courseId },
			attributes: { exclude: ['updateAt'] }
		});

		if (course) {
			return course;
		}
		throw new NotFoundException('Course does not exist!');
	}
}
