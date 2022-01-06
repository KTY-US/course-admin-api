import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Course } from 'src/courses/entity/course.entity';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [SequelizeModule.forFeature([Course]), UsersModule],
	providers: [CoursesService],
	controllers: [CoursesController],
	exports: [CoursesService]
})
export class CoursesModule {}
