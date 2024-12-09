import { Column } from 'typeorm';

export class User {
  @Column({ type: 'date', nullable: true })
  birth_date: Date;
  @Column({ type: 'varchar', length: 255, nullable: true })
  birth_place: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pport_no: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  user_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ctzn: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;
}
