import { Request, Response, response} from 'express'
import knex from '../database/connection'

class CorretoresController{

	async show(req: Request, res: Response){
		const {id} = req.params
		const corretor = await knex('corretor').select('*').where({id})
		return res.json(corretor)
	}
	
    async index(req: Request, res: Response){
        const corretor = await knex('corretor').select('*')
        return res.json(corretor)
    }

    async create(req: Request, res: Response){
        try {
            const { nome, email } = req.body
            const file = req.file ? req.file.filename : ''
            await knex('corretor').insert({ nome, email, image: file })
            res.status(201).send()

        } catch (error) {
           res.send(error)
        }
    }

    async update(req: Request, res: Response){
        try {
            const { nome, email } = req.body
            const { id } = req.params

            await knex('corretor')
            .update({ 
                nome,
                email})
            .where({ id })

            return res.status(204).send()

        } catch (error) {
            res.send(error)
        }
    }

    async delete(req: Request, res: Response){
        try {
            const { id } = req.params
            const corretor = await knex('corretor').where('id', id).first()
            
            if(!corretor){
                return res.status(400).json({ message:'corretor não existe.'})
            }
            else{
                await knex('corretor').where({ id }).del()
                return res.status(204).send()
            }

        } catch (error) {
            res.status(200).send(error)
        }
    }

}

export default CorretoresController