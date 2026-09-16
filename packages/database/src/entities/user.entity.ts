import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 320,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'password_hash',
  })
  passwordHash: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'first_name',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'last_name',
    nullable: true,
  })
  lastName: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  avatar: string;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;
}
