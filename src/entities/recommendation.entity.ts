import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column("text")
  recommendation: string;
}
