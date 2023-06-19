import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Artist } from './artist.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist)
    private artistModel: typeof Artist,
  ) {}
}
