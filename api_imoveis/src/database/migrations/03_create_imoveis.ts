import Knex from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('imovel', table => {
        table.increments('id').primary()
        table.string('descricao').notNullable()
        table.string('endereco').notNullable()
        table.string('detalhes',2000).notNullable()
        table.string('image',2000).notNullable()
        table.decimal('latitude').notNullable()
        table.decimal('longitude').notNullable()
        table.string('cidade',50).notNullable()
        table.string('uf', 2).notNullable()
        table.float('valor',8,3).notNullable()
        table.integer('id_categoria').notNullable().unsigned().references('id').inTable('categoria')
        table.integer('id_corretor').notNullable().unsigned().references('id').inTable('corretor')
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('imovel')
}