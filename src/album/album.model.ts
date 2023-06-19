import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { TrackAlbum } from 'src/track-album/track-album.model';
import { Track } from 'src/track/track.model';
import { User } from 'src/user/user.model';

@Table
export class Album extends Model {
  @BelongsToMany(() => Track, () => TrackAlbum)
  tracks: Track[];

  @Column
  name: string;

  @Column
  picture: string;

  @HasMany(() => TrackAlbum, 'album_id')
  tracks_in_album: TrackAlbum[];

  @ForeignKey(() => User)
  @Column
  user_id: number;
  // Указываем колонку из этой таблицы
  @BelongsTo(() => User, 'user_id')
  user: User;
}
