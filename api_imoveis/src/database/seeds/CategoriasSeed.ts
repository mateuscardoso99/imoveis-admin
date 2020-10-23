import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("categorias").del()
        .then(() => {
            // Inserts seed entries
            return knex("categorias").insert([
                {
                    id: 1,
                    descricao: "casa",
                },
                {
                    id: 2,
                    descricao: "apartamento",
                }
            ]);
        });
};
