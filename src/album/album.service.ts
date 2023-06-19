import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Album } from './album.model';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album)
    private albumModel: typeof Album,
  ) {}
}
