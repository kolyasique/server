import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { Track } from 'src/track/track.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Comment]),
    SequelizeModule.forFeature([Track]),
  ],
  //Это для использования репозитрия вне модуля
  exports: [SequelizeModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
