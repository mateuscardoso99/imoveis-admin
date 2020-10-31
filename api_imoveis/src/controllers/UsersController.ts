import { Request, Response} from 'express'
import knex from '../database/connection'

import bcrypt from 'bcrypt'

class UsersController{

    async show(req: Request, res: Response){
        try {
            const {id} = req.params
            const user = await knex('users').select('users.id','users.usuario').where({id})
            return res.json(user)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async index(req: Request, res: Response){
        try {
            const users = await knex('users').select('users.id','users.usuario')
            return res.json(users)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async create(req: Request, res: Response){
        try {
            const { login, password } = req.body
            const hash = bcrypt.hashSync(password, 10)
            await knex('users').insert({ usuario: login, senha: hash })
            return res.status(201).send()
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async update(req: Request, res: Response){
        try {
            const { login, password } = req.body
            const { id } = req.params

            await knex('users').update({ usuario:login, senha: password }).where({ id })

            return res.status(204).send()

        } catch (error) {
            res.status(500).send(error)
        }
    }

    async delete(req: Request, res: Response){
        try {
            const { id } = req.params
            const user = await knex('users').where({id}).first()

            if(!user){
                return res.status(400).json({ message:'usuario não existe.'})
            }
            else{
                const count = await knex('users').count({id: 'id'})
                if(count[0].id > 1){
                    await knex('users')
                        .where({ id })
                        .del()
    
                    return res.status(204).send()
                }
                
                return res.json('user limit error')
            }

        } catch (error) {
            res.status(500).send(error)
        }
    }

}

export default UsersController