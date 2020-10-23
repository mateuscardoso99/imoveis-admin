import * as Knex from "knex";
import bcrypt from 'bcrypt'

const hash = bcrypt.hashSync('1234',10)

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("users").del()
        .then(() => {
            // Inserts seed entries
            return knex("users").insert([
                {
                    id: 1,
                    usuario: "admin",
                    senha: hash
                },
            ]);
        });
};
