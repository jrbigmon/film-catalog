import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1713201023999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sql = `
        CREATE TABLE IF NOT EXISTS user (
            id VARCHAR(255) NOT NULL PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            email VARCHAR(200) NOT NULL,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NOT NULL,
            deleted_at TIMESTAMP,
        );
    `;

    await queryRunner.query(sql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const sql = `DROP TABLE user;`;

    await queryRunner.query(sql);
  }
}
