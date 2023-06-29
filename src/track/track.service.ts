import { HttpStatus, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { Track } from './track.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTrackDto } from './dto/create-track.dto';
import { Artist } from 'src/artist/artist.model';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class TrackService {
  constructor(
    //Dependency injection - внедрение модели для использования в сервисе
    @InjectModel(Track)
    private trackModel: typeof Track,
    @InjectModel(Artist)
    private artistModel: typeof Artist,
    //подключаем сервис файлов
    private fileService: FileService,
  ) {}

  // В create указываем dto. Далее так как у нас функция асинхронная,
  // мы явно указываем что на выходе у нас будет объект Track ипа промис
  //tomat: audio и picture может и неправильно
  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    console.log(audio, picture, 'ЭТО В СЕРВИСЕ');
    try {
      const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
      const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

      //В create разворачиваем dto и добавляем listens=0
      const artistName = dto.artist;
      const artistExists = await this.artistModel.findOne({
        where: { name: artistName },
      });
      if (artistExists) {
        const track = await this.trackModel.create({
          name: dto.name,
          text: dto.text,
          listens: 0,
          artist_id: artistExists.id,
          //tomat: user_id - hardcode
          user_id: 1,
          audio: audioPath,
          picture: picturePath,
        });
        return track;
      } else {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
        const picturePath = this.fileService.createFile(
          FileType.IMAGE,
          picture,
        );

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
          audio: audioPath,
          picture: picturePath,
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

  async getAll(count: number, offset: number): Promise<Track[]> {
    const tracks = await this.trackModel.findAll({
      offset: offset,
      limit: count,
    });
    return tracks;
  }

  async search(query: string): Promise<Track[]> {
    try {
      //tomat: Тут надо подумать над регуляркой

      const regex = `/${query}/g`;

      const trackArr = await this.trackModel.findAll({
        where: {
          name: {
            //Это типа совпадения с поиском
            [Op.regexp]: query,
          },
        },
      });
      return trackArr;
    } catch (error) {
      console.log(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'ВЫШЛА ОШИБКА',
      );
    }
  }
  async getOne(id: number): Promise<Track> {
    const track = await this.trackModel.findOne({ where: { id } });
    return track;
  }
  async delete(id: number): Promise<number> {
    const deleteTrack = await this.trackModel.destroy({ where: { id } });
    return deleteTrack;
  }
  async listen(id: number): Promise<boolean> {
    const findTrack = await this.trackModel.findOne({ where: { id } });
    findTrack.listens += 1;
    findTrack.save();
    return true;
  }
}
