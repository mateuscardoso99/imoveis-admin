import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("corretores").del()
        .then(() => {
            // Inserts seed entries
            return knex("corretores").insert([
                {
                    id: 1,
                    nome: "joao",
                    email: "joao@joao"
                },
                {
                    id: 2,
                    nome: "felix",
                    email: "felix@gmail.com"
                }
            ]);
        });
};
