import path from 'path';

module.exports = {

    development: {
      client: 'mysql',
      connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '',
        database : 'node_imoveis'
      },
  
      migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
      },
  
      seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
      }
    }
  
  };