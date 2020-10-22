import * as Knex from "knex";

export async function up(knex: Knex){
	return knex.schema.createTable('imagens', table => {
        table.increments('id').primary()
        table.string('path').notNullable()

        table.integer('id_imovel')
        	.notNullable()
        	.unsigned()
        	.references('id')
        	.inTable('imoveis')
        	.onDelete('cascade')
            .onUpdate('cascade')

        table.integer('id_corretor')
        	.notNullable()
        	.unsigned()
        	.references('id')
        	.inTable('corretores')
        	.onDelete('cascade')
            .onUpdate('cascade')
    })
}


export async function down(knex: Knex){
	return knex.schema.dropTable('imagens')
}

