import Knex from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('corretores', table => {
        table.increments('id').primary()
        table.string('nome').notNullable()
        table.string('email').notNullable()
        table.string('imagem').nullable()
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('corretores')
}