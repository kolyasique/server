import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('/tracks')
export class TrackController {
  //Делаем dependency injection чтобы использовать сервис в контроллере
  constructor(private trackService: TrackService) {}
  @Post()
  // useInterceptors - для загрузки файлов
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  //
  //Здесь прописывается body (что мы получаем с клиента, и CreateTrackDto - что мы извлекаем)
  create(
    @UploadedFiles()
    files: { picture?: Express.Multer.File[]; audio?: Express.Multer.File[] },
    @Body() dto: CreateTrackDto,
  ) {
    console.log(files.picture, 'ЭТО ФАЙЛ КАРТИНКИ');
    const { picture, audio } = files;
    //Здесь мы вызываем функцию из конструктора
    return this.trackService.create(dto, picture[0], audio[0]);
  }
  @Get('/getall')
  //Здесь распишем для пагинации
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAll(count, offset);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.trackService.search(query);
  }

  @Get('/getone/:id')
  getOne(@Param('id') id: number) {
    return this.trackService.getOne(id);
  }
  @Delete('/delete/:id')
  delete(@Param('id') id: number) {
    return this.trackService.delete(id);
  }
  @Post('/listen/:id')
  listen(@Param('id') id: any) {
    return this.trackService.listen(id);
  }
}
