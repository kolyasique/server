import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumService } from './album/album.service';
import { AlbumController } from './album/album.controller';
import { AlbumModule } from './album/album.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TrackAlbumService } from './track-album/track-album.service';
import { TrackAlbumController } from './track-album/track-album.controller';
import { TrackAlbumModule } from './track-album/track-album.module';
import { User } from './user/user.model';
import { Track } from './track/track.model';
import { Album } from './album/album.model';
import { Comment } from './comment/comment.model';
import { TrackAlbum } from './track-album/track-album.model';
import { Artist } from './artist/artist.model';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  //Здесь мы регистрируем все контроллеры и провайдеры у app и дакже другие изолированные модули
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '54321',
      database: 'nest_next_one',
      models: [User, Track, Album, Comment, TrackAlbum, Artist],
      autoLoadModels: true,
      synchronize: true,
    }),
    //Для раздачи статики
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    CommentModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    UserModule,
    TrackAlbumModule,
    FileModule,
  ],
  providers: [AppService],
  //   AuthorService, AlbumService
  //   controllers: [AuthorController, AlbumController],
})
export class AppModule {}
