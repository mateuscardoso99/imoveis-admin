import path from 'path';
require('dotenv').config()

module.exports = {
    test: {
      client: 'sqlite3',
      connection: {
        filename: path.resolve(__dirname,'tests','database.sqlite'),
      },
      migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
      },
      seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
      },
      useNullAsDefault: true,
    },
    
    development: {
      client: process.env.DB_CLIENT,
      connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_NAME
      },
  
      migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
      },
  
      seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
      }
    }
  
  };