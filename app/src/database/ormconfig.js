/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { DataSource } = require('typeorm');

const databaseConfig = readFileSync(
  resolve('src', 'database', 'database.config.json'),
);

module.exports = new DataSource(JSON.parse(databaseConfig));
