import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Track } from './track.model';

@Module({
  imports: [SequelizeModule.forFeature([Track])],
  //Это для использования репозитрия вне модуля
  exports: [SequelizeModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
