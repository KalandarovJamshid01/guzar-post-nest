import { AbstractEntity } from 'src/database/abstract.entity';
import { District } from 'src/districts/entities/district.entity';
import { Column, ManyToOne } from 'typeorm';

export class Quarter extends AbstractEntity<Quarter> {
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @ManyToOne(() => District, (district) => district.quarters, { cascade: true })
  district: District;
}
