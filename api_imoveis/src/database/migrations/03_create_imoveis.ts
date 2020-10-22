import Knex from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('imoveis', table => {
        table.increments('id').primary()
        table.string('descricao').notNullable()
        table.string('endereco').notNullable()
        table.text('detalhes').notNullable()
        table.decimal('latitude').notNullable()
        table.decimal('longitude').notNullable()
        table.string('cidade',50).notNullable()
        table.string('uf', 2).notNullable()
        table.float('valor',8,3).notNullable()

        table.integer('id_categoria')
            .nullable()
            .unsigned()
            .references('id')
            .inTable('categorias')
            .onDelete('set null')
            .onUpdate('cascade')

        table.integer('id_corretor')
            .nullable()
            .unsigned()
            .references('id')
            .inTable('corretores')
            .onDelete('set null')
            .onUpdate('cascade')
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('imoveis')
}