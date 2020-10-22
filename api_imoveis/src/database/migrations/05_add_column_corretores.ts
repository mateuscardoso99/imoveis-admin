import Knex from "knex";


export async function up(knex: Knex){
    return knex.schema.alterTable('corretor', function(table){
        table.string('image').notNullable()
    })
}


export async function down(knex: Knex){
    return knex.schema.hasColumn('corretor', 'image').then(exists => {
        knex.schema.table('corretor', t => t.dropColumn('image'))
    })
}

