import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Track } from 'src/track/track.model';
import { User } from 'src/user/user.model';

@Table
export class Comment extends Model {
  @Column
  text: string;

  @ForeignKey(() => User)
  @Column
  user_id: number;
  // Указываем колонку из этой таблицы
  @BelongsTo(() => User, 'user_id')
  user: User;

  @ForeignKey(() => Track)
  @Column
  track_id: number;
  // Указываем колонку из этой таблицы
  @BelongsTo(() => Track, 'track_id')
  track: Track;
}
