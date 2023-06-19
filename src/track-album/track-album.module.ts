import { Module } from '@nestjs/common';
import { TrackAlbum } from './track-album.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrackAlbumController } from './track-album.controller';
import { TrackAlbumService } from './track-album.service';

@Module({
  imports: [SequelizeModule.forFeature([TrackAlbum])],
  //Это для использования репозитрия вне модуля
  exports: [SequelizeModule],
  controllers: [TrackAlbumController],
  providers: [TrackAlbumService],
})
export class TrackAlbumModule {}
