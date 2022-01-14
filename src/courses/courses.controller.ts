import { Controller, Get, Query, UseGuards } from '@nestjs/common';
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
		@Query('sortMode') sortMode?: string
	): Promise<{ courses: Course[]; total: number }> {
		try {
			return this.coursesService.getAllCourses(accountId, +page, +rowsPerPage, sortMode);
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
