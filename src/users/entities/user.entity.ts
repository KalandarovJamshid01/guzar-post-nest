import { AbstractEntity } from 'src/database/abstract.entity';
import { Column } from 'typeorm';

export class User extends AbstractEntity<User> {
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

  @Column({ type: 'varchar', length: 255, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  full_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  gd: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mid_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mob_phone_no: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  natn: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  per_adr: string;

  @Column({ type: 'bigint', nullable: false, unique: true })
  pin: number;

  @Column({ type: 'date', nullable: true })
  pport_expr_date: Date;

  @Column({ type: 'date', nullable: true })
  pport_issue_date: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pport_issue_place: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  sur_name: string;

  @Column({ type: 'int', nullable: true })
  tin: number;

  @Column({ type: 'enum', enum: ['I', 'L'], nullable: true })
  user_type: 'I' | 'L';

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: [
      'superadmin',
      'admin',
      'moderator',
      'client',
      'admin_app',
      'admin_bin',
      'admin_ptt',
      'admin_cargo',
      'admin_cpt',
      'admin_bts',
    ],
    default: 'client',
  })
  role: string;

  @Column({ type: 'int', nullable: true })
  limit: number;
}
