import {
  AllowNull,
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Album } from 'src/album/album.model';
import { Comment } from 'src/comment/comment.model';
import { Track } from 'src/track/track.model';

@Table
export class User extends Model {
  // tomat: Возможно нужно будет подправить связь с треками через комменты
  @Column({ unique: true })
  login: string;

  @Column
  password: string;

  @Column({ allowNull: true })
  name: string;

  @Column
  picture: string;

  @HasMany(() => Album, 'user_id')
  user_albums: Album[];

  @HasMany(() => Comment, 'user_id')
  user_comments: Comment[];

  @HasMany(() => Track, 'user_id')
  user_tracks: Track[];
}
