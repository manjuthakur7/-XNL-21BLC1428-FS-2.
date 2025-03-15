import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Recommendation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @Column()
  steps: number;

  @Column()
  heart_rate: number;

  @Column("text")
  recommendation: string;

  @CreateDateColumn()
  created_at: Date;
}
