import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comment.model';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  //Это для использования репозитрия вне модуля
  exports: [SequelizeModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
