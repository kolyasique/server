import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Album } from 'src/album/album.model';
import { Artist } from 'src/artist/artist.model';
import { Comment } from 'src/comment/comment.model';
import { CommentModule } from 'src/comment/comment.module';
import { TrackAlbum } from 'src/track-album/track-album.model';
import { User } from 'src/user/user.model';

@Table
export class Track extends Model {
  @BelongsToMany(() => Album, () => TrackAlbum)
  albums: Album[];

  @Column
  name: string;

  // "Это на случай если будем использовать таблицу artist"
  @ForeignKey(() => Artist)
  @Column
  artist_id: number;
  // Указываем колонку из этой таблицы
  @BelongsTo(() => Artist, 'artist_id')
  artist: Artist;

  // @Column
  // artist: string;

  @Column
  text: string;

  @Column({ defaultValue: 0 })
  listens: number;

  @Column({ allowNull: true })
  picture: string;

  @Column
  audio: string;

  @ForeignKey(() => User)
  @Column
  user_id: number;
  // Указываем колонку из этой таблицы
  @BelongsTo(() => User, 'user_id')
  user: User;

  @HasMany(() => TrackAlbum, 'track_id')
  track_in_albums: TrackAlbum[];

  @HasMany(() => Comment, 'track_id')
  track_comments: Comment[];
}
