import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Album } from './album.model';

@Module({
  imports: [SequelizeModule.forFeature([Album])],
  //Это для использования репозитрия вне модуля (в других модулях можно будет его простоо импортировать типа как imports: [UsersModule],)
  exports: [SequelizeModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
