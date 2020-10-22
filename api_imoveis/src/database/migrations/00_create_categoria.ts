import Knex from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('categoria', table => {
        table.increments('id').primary()
        table.string('tipo').notNullable()
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('categoria')
}