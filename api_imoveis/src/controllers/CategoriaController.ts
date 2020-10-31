import { Request, Response} from 'express'
import knex from '../database/connection'

class CategoriaController{

    async index(req: Request, res: Response){
        try {
            const cats = await knex('categorias').select('*')
            return res.json(cats)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async create(req: Request, res: Response){
        try {
            const { tipo } = req.body
            await knex('categorias').insert({ tipo })
            res.status(201).send()

        } catch (error) {
            res.status(500).send(error)
        }
    }

    async update(req: Request, res: Response){
        try {
            const { tipo } = req.body
            const { id } = req.params

            await knex('categorias').update({ tipo }).where({ id })

            return res.send()

        } catch (error) {
            res.status(500).send(error)
        }
    }

    async delete(req: Request, res: Response){
        try {
            const { id } = req.params
            const cat = await knex('categorias').where('id', id).first()
            
            if(!cat){
                return res.status(400).json({ message:'categoria não existe.'})
            }
            else{
                await knex('categorias')
                    .where({ id })
                    .del()

                return res.send()
            }

        } catch (error) {
            res.status(500).send(error)
        }
    }

}

export default CategoriaController