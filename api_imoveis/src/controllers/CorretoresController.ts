import { Request, Response, response} from 'express'
import knex from '../database/connection'
import fs from 'fs'
import path from 'path'

class CorretoresController{

	async show(req: Request, res: Response){
        try {
    		const {id} = req.params
            const corretor = await knex('corretores')
                                    .where({id})

            const serializedCorretor = corretor.map(cr => {
                return{
                    ...cr,
                    imagem: cr.imagem && `http://localhost:3333/uploads/corretores/${cr.imagem}`
                }
            })
            return res.json(serializedCorretor)
        } catch (error) {
            res.status(500).send(error)
        }
	}
	
    async index(req: Request, res: Response){
        try {
            const corretores = await knex('corretores')

            const serializedCorretores = corretores.map(cr => {
                return{
                    ...cr,
                    imagem: cr.imagem && `http://localhost:3333/uploads/corretores/${cr.imagem}`
                }
            })
            return res.json(serializedCorretores)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async create(req: Request, res: Response){
        try {
            const { nome, email } = req.body
            const file = req.file as Express.Multer.File || null

            await knex('corretores')
                    .insert({ nome, email, imagem:file.filename })

            res.status(201).send()

        } catch (error) {
            res.status(500).send(error)
        }
    }

    async update(req: Request, res: Response){
        try {
            const { id } = req.params
            const { nome, email } = req.body

            await knex('corretores')
            .update({ 
                nome,
                email})
            .where({ id })

            res.status(204).send()

        } catch (error) {
            res.status(500).send(error)
        }
    }

    async delete(req: Request, res: Response){
        try {
            const { id } = req.params
            const corretor = await knex('corretores').where({id})
            
            if(!corretor){
                return res.status(400).json({ message:'corretor não existe.'})
            }

            if(corretor[0].imagem){
                fs.unlink(path.resolve(__dirname,'..','..','uploads','corretores', `${corretor[0].imagem}`), (err) => {
                    if (err) {
                        console.error(err)
                        return res.status(200).send(err)
                    }
                })
            }

            await knex('corretores').where({ id }).del()
            return res.status(204).send()

        } catch (error) {
            res.status(200).send(error)
        }
    }

}

export default CorretoresController