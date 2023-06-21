import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Track } from './track.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTrackDto } from './dto/create-track.dto';
import { Artist } from 'src/artist/artist.model';

@Injectable()
export class TrackService {
  constructor(
    //Dependency injection - внедрение модели для использования в сервисе
    @InjectModel(Track)
    private trackModel: typeof Track,
    @InjectModel(Artist)
    private artistModel: typeof Artist,
  ) {}

  // В create указываем dto. Далее так как у нас функция асинхронная,
  // мы явно указываем что на выходе у нас будет объект Track ипа промис
  async create(dto: CreateTrackDto): Promise<Track> {
    try {
      //В create разворачиваем dto и добавляем listens=0
      const artistName = dto.artist;
      const artistExists = await this.artistModel.findAll({
        where: { name: artistName },
      });
      if (artistExists.length > 0) {
        const track = await this.trackModel.create({
          name: dto.name,
          text: dto.text,
          listens: 0,
          artist_id: artistExists[0].id,
          //tomat: user_id - hardcode
          user_id: 1,
        });
        return track;
      } else {
        const artist = await this.artistModel.create({
          name: dto.artist,
        });
        const track = await this.trackModel.create({
          name: dto.name,
          text: dto.text,
          listens: 0,
          artist_id: artist.id,
          //tomat (Это хардкод)
          user_id: 1,
        });
        return track;
      }
    } catch (error) {
      console.log(error, 'ВЫШЛА ОШИБКА');
    }
  }

  // async checkArtistExist(artistName: string): Promise<number> {
  //   const artistExists = await this.artistModel.findAll({
  //     where: { name: artistName },
  //   });
  //   return artistExists.length;
  // }

  async getAll(): Promise<Track[]> {
    const tracks = await this.trackModel.findAll();
    return tracks;
  }
  async getOne(id: number): Promise<Track> {
    const track = await this.trackModel.findOne({ where: { id } });
    return track;
  }
  async delete(id: number): Promise<number> {
    const deleteTrack = await this.trackModel.destroy({ where: { id } });
    return deleteTrack;
  }
}
