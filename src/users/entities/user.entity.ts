import { Column } from 'typeorm';

export class User {
  @Column({ type: 'date', nullable: true })
  birth_date: Date;
}
