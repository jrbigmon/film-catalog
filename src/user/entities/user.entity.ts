import { randomUUID } from 'crypto';
import { IUser } from './user.interface';

export class User {
  private id: string;
  private name: string;
  private email: string;
  private username: string;
  private password: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;

  constructor(
    name: string,
    email: string,
    username: string,
    password: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
  ) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.id = id ?? randomUUID();
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public static create({ name, email, username, password }: IUser): User {
    const newUser = new User(name, email, username, password);

    return newUser;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getDeletedAt(): Date {
    return this.deletedAt;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  public setDeletedAt(deletedAt: Date): void {
    this.deletedAt = deletedAt;
  }

  public toJSON(): Omit<IUser, 'password'> {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
