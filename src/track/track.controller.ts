import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TrackController {
  //Делаем dependency injection чтобы использовать сервис в контроллере
  constructor(private trackService: TrackService) {}
  @Post()
  // useInterceptors - для загрузки файлов
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  //Здесь прописывается body (что мы получаем с клиента, и CreateTrackDto - что мы извлекаем)
  create(@Body() dto: CreateTrackDto) {
    //Здесь мы вызываем функцию из конструктора
    return this.trackService.create(dto);
  }
  @Get('/getall')
  getAll() {
    return this.trackService.getAll();
  }
  @Get('/getone/:id')
  getOne(@Param('id') id: number) {
    return this.trackService.getOne(id);
  }
  @Delete('/delete/:id')
  delete(@Param('id') id: number) {
    return this.trackService.delete(id);
  }
}
