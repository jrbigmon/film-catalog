import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class UserRepositoryTypeOrm {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public username: string;

  @Column()
  public password: string;

  @CreateDateColumn()
  public createdAt: Date;

  @CreateDateColumn()
  public updatedAt: Date;

  @CreateDateColumn()
  public deletedAt: Date;
}
