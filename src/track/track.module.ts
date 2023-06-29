import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Track } from './track.model';
import { Artist } from 'src/artist/artist.model';
import { FileService } from 'src/file/file.service';

@Module({
  //Сюда импортируем все модели которые мы будем использовать в Service
  imports: [
    SequelizeModule.forFeature([Track]),
    SequelizeModule.forFeature([Artist]),
  ],
  //Это для использования репозитрия вне модуля
  exports: [SequelizeModule],
  controllers: [TrackController],
  providers: [TrackService, FileService],
})
export class TrackModule {}
