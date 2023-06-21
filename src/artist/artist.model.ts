import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Track } from 'src/track/track.model';

@Table
export class Artist extends Model {
  @Column
  name: string;

  // @Column({ primaryKey: true })
  // id: string;
  //tomat

  @HasMany(() => Track, 'artist')
  artist_tracks: Track[];
}
