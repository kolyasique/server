import { Controller, Get, Post } from '@nestjs/common';

@Controller('/tracks')
export class TrackController {
  @Post()
  create() {
    return 'CREATED';
  }
  @Get('/getall')
  getAll() {
    return 'getAllWork WORKS';
  }
  @Get('/getone')
  getOne() {
    return 'getOne WORKS';
  }
  @Get()
  delete() {
    return 'delete WORKS';
  }
}
