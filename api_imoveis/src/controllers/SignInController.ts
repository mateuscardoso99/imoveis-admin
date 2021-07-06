import { Request, Response} from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'
import {generateJwt, generateRefreshJwt} from '../auth/jwt'

class SignInController{
    async signIn(req: Request, res: Response){
        try {
            const {login, password} = req.body
            const user = await knex.select('*').from('users').where('users.usuario',String(login))
            
            if(user.length === 0) return res.status(404).json('not found')

            const match = user ? bcrypt.compareSync(password, user[0].senha) : null
            if(!match) return res.status(400).json('invalid data')

            const token = generateJwt({id: user.id})
            const refreshToken = generateRefreshJwt({id: user.id})
            const metadata = {token,refreshToken}

            return res.status(200).json({user:user[0].usuario,metadata})
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export default SignInController