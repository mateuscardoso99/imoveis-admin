import { Request, Response} from 'express'
import knex from '../database/connection'

class CategoriaController{

    async index(req: Request, res: Response){
        const cats = await knex('categoria').select('*')
        return res.json(cats)
    }

    async create(req: Request, res: Response){
        try {
            const { tipo } = req.body
            await knex('categoria').insert({ tipo })
            res.status(201).send()

        } catch (error) {
           res.send(error)
        }
    }

    async update(req: Request, res: Response){
        try {
            const { tipo } = req.body
            const { id } = req.params

            await knex('categoria').update({ tipo }).where({ id })

            return res.send()

        } catch (error) {
            res.send(error)
        }
    }

    async delete(req: Request, res: Response){
        try {
            const { id } = req.params
            const cat = await knex('categoria').where('id', id).first()
            
            if(!cat){
                return res.status(400).json({ message:'categoria não existe.'})
            }
            else{
                await knex('categoria')
                    .where({ id })
                    .del()

                return res.send()
            }

        } catch (error) {
            res.send(error)
        }
    }

}

export default CategoriaController