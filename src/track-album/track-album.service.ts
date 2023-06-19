import { Injectable } from '@nestjs/common';
import { TrackAlbum } from './track-album.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TrackAlbumService {
  constructor(
    @InjectModel(TrackAlbum)
    private trackAlbumModel: typeof TrackAlbum,
  ) {}
}
