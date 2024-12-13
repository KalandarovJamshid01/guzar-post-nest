import { AbstractEntity } from 'src/database/abstract.entity';
import { Quarter } from 'src/quarters/entities/quarter.entity';
import { Region } from 'src/regions/entities/region.entity';
import { Column, ManyToOne, OneToMany } from 'typeorm';

export class District extends AbstractEntity<District> {
  @Column()
  name_uz: string;
  @Column()
  name_oz: string;
  @Column()
  name_ru: string;

  @ManyToOne(() => Region, (region) => region.districts, { cascade: true })
  region: Region;
  @OneToMany(() => Quarter, (quarter) => quarter.district, { cascade: true })
  quarters: Quarter[];
}
