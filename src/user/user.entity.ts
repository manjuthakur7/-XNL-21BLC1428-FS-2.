import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Marks this class as a database entity
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
