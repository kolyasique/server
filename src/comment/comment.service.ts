import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Comment } from './comment.model';
import { Track } from 'src/track/track.model';
import { AddCommentDto } from './dto/add-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment)
    private commentModel: typeof Comment,
    @InjectModel(Track)
    private trackModel: typeof Track,
  ) {}

  async addComment(dto: AddCommentDto, track_id: number): Promise<Comment> {
    const comment = await this.commentModel.create({
      text: dto.text,
      //tomat: user_id - hardcode
      user_id: 1,
      track_id,
    });
    return comment;
  }
}
