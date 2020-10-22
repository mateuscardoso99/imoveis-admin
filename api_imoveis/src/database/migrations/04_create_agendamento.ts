import Knex from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('agendamento', table => {
        table.increments('id').primary()
        table.string('mensagem').notNullable()
        table.string('situacao').notNullable().defaultTo('pendente')
        table.integer('id_imovel').notNullable().unsigned().references('id').inTable('imovel')
        table.integer('id_corretor').notNullable().unsigned().references('id').inTable('corretor')
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('agendamento')
}