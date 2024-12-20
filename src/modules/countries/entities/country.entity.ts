import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Country extends AbstractEntity<Country> {
  @Column({ type: 'varchar', unique: true })
  name: string;
  @Column({ type: 'varchar', unique: true })
  code: string;
}
