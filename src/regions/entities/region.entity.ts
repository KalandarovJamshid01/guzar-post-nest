import { AbstractEntity } from 'src/database/abstract.entity';
import { District } from 'src/districts/entities/district.entity';
import { Column, OneToMany } from 'typeorm';

export class Region extends AbstractEntity<Region> {
  @Column()
  name_uz: string;
  @Column()
  name_oz: string;
  @Column()
  name_ru: string;

  @OneToMany(() => District, (district) => district.region, { cascade: true })
  districts: District[];
}
