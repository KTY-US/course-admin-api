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

	async getAllCourses(sortMode?: string): Promise<Course[]> {
		let myOrder = sequelize.literal('courseName ASC');

		if (sortMode === 'time-asc') {
			myOrder = sequelize.literal('createAt ASC');
		} else if (sortMode === 'time-desc') {
			myOrder = sequelize.literal('createAt DESC');
		}

		return await this.courseModel.findAll({ attributes: { exclude: ['updateAt'] }, order: myOrder });
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
