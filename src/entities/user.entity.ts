import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity() // 👈 Marks this as a TypeORM entity
export class User {
  @PrimaryGeneratedColumn() // 👈 Auto-incremented primary key
  id: number;

  @Column({ unique: true }) // 👈 Ensures unique usernames
  username: string;

  @Column() // 👈 Store hashed passwords
  password: string;

  @Column({ nullable: true }) // 👈 Optional email field
  email: string;

  @CreateDateColumn() // 👈 Auto-sets creation timestamp
  createdAt: Date;

  @UpdateDateColumn() // 👈 Auto-sets update timestamp
  updatedAt: Date;
}
