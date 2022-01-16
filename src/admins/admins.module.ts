import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { Admin } from './entity/admin.entity';

@Module({
	imports: [SequelizeModule.forFeature([Admin])],
	providers: [AdminsService],
	controllers: [AdminsController],
	exports: [AdminsService]
})
export class AdminsModule {}
