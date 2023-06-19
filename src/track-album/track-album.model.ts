import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Album } from 'src/album/album.model';
import { Track } from 'src/track/track.model';

@Table
export class TrackAlbum extends Model {
  @ForeignKey(() => Album)
  @Column
  album_id: number;
  // Указываем колонку из этой таблицы
  @BelongsTo(() => Album, 'album_id')
  album: Album;

  @ForeignKey(() => Track)
  @Column
  track_id: number;
  // Указываем колонку из этой таблицы
  @BelongsTo(() => Track, 'track_id')
  track: Track;
}
