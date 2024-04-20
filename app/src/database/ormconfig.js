/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { DataSource } = require('typeorm');

let databaseConfig = '';

try {
  databaseConfig = readFileSync(
    resolve('src', 'database', 'database.config.json'),
  );
} catch (_) {
  try {
    console.error(
      'Config to production database not found, using the sample file',
    );

    databaseConfig = readFileSync(
      resolve('src', 'database', 'database.config.sample.json'),
    );
  } catch (error) {
    console.error('Production and sample database config not found', err);
    throw error;
  }
}

module.exports = new DataSource(JSON.parse(databaseConfig));
