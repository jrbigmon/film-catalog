import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class MovieToGenre1713223968355 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie_to_genre',
        columns: [
          {
            name: 'movie_id',
            type: 'varchar(255)',
            isPrimary: true,
          },
          {
            name: 'genre_id',
            type: 'varchar(255)',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'movie_to_genre',
      new TableForeignKey({
        columnNames: ['movie_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movie',
      }),
    );
    await queryRunner.createForeignKey(
      'movie_to_genre',
      new TableForeignKey({
        columnNames: ['genre_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movie_genre',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movie_to_genre');
  }
}
