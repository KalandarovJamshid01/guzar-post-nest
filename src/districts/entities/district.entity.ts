import { Quarter } from 'src/quarters/entities/quarter.entity';
import { Region } from 'src/regions/entities/region.entity';
import { ManyToOne, OneToMany } from 'typeorm';

export class District extends Region {
  @ManyToOne(() => Region, (region) => region.districts, { cascade: true })
  region: Region;
  @OneToMany(() => Quarter, (quarter) => quarter.district, { cascade: true })
  quarters: Quarter[];
}
