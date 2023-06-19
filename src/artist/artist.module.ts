import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Artist } from './artist.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Artist])],
  //Это для использования репозитрия вне модуля
  exports: [SequelizeModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
