import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Movie1713223527729 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie',
        columns: [
          {
            name: 'id',
            type: 'varchar(255)',
            isUnique: true,
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar(200)',
            isNullable: false,
          },
          {
            name: 'director',
            type: 'varchar(150)',
            isNullable: false,
          },
          {
            name: 'release_year',
            type: 'int(10)',
            isNullable: false,
          },
          {
            name: 'duration_minutes',
            type: 'int(10)',
            isNullable: false,
          },
          {
            name: 'rating',
            type: 'int(5)',
            default: 0,
            isNullable: false,
          },
          {
            name: 'language',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'country',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'synopsis',
            type: 'varchar(700)',
            isNullable: true,
          },
          {
            name: 'poster_url',
            type: 'varchar(400)',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movie');
  }
}
