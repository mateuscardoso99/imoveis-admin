import * as Knex from "knex";

export async function up(knex: Knex){
	return knex.schema.createTable('imagens', table => {
        table.increments('id').primary()
        table.string('path').notNullable()

        table.integer('id_imovel')
        	.nullable()
        	.unsigned()
        	.references('id')
        	.inTable('imoveis')
        	.onDelete('cascade')
            .onUpdate('cascade')
    })
}


export async function down(knex: Knex){
	return knex.schema.dropTable('imagens')
}

