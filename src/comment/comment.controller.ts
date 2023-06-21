import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AddCommentDto } from './dto/add-comment.dto';

@Controller('/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}
  @Post('/addcommentfor/:id')
  //Здесь прописывается body (что мы получаем с клиента, и CreateTrackDto - что мы извлекаем)
  create(@Param('id') id: number, @Body() dto: AddCommentDto) {
    //Здесь мы вызываем функцию из конструктора
    return this.commentService.addComment(dto, id);
  }
}
