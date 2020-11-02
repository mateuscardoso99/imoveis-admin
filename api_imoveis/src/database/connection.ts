require('dotenv').config()

const knexfile = require('../../knexfile')

let knex = null
if (process.env.NODE_ENV === 'test') {
	knex = require('knex')(knexfile['test'])
}
else{
	knex = require('knex')(knexfile['development'])
}


export default knex