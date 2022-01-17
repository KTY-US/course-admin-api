import { Controller, Delete, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CoursesService } from './courses.service';
import { Course } from './entity/course.entity';

@Controller('courses')
export class CoursesController {
	constructor(private readonly coursesService: CoursesService) {}

	@Get('all')
	// @UseGuards(AuthGuard('jwt'))
	getAllCourses(
		@Query('page') page: string,
		@Query('rowsPerPage') rowsPerPage: string,
		@Query('accountId') accountId: string,
		@Query('sortMode') sortMode: string,
		@Query('searchString') searchString?: string
	): Promise<{ courses: Course[]; total: number }> {
		try {
			return this.coursesService.getAllCourses(accountId, +page, +rowsPerPage, sortMode, searchString);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Get(':id')
	@UseGuards(AuthGuard('jwt'))
	async getCourse(@Param('id') id: string): Promise<Course> {
		try {
			return this.coursesService.getCourseDetail(id);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	@Delete(':id')
	@UseGuards(AuthGuard('jwt'))
	async deleteCourse(@Param('id') id: string): Promise<void> {
		try {
			return this.coursesService.deleteCourse(id);
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
