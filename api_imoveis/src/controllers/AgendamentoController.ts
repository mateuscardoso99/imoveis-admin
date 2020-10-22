import { Request, Response} from 'express'
import knex from '../database/connection'

class AgendamentoController{

    async show(req: Request, res: Response){
        const id = req.params
        const agendamento = await knex('agendamento').where(id)
        return res.json(agendamento)
    }

    async index(req: Request, res: Response){
        const agendamentos = await knex('agendamento')
        .join('corretor', 'corretor.id', '=', 'agendamento.id_corretor')
        .join('imovel', 'imovel.id', '=', 'agendamento.id_imovel')
        .select('agendamento.*','corretor.nome as nomeCorretor')
        return res.json(agendamentos)
    }

    async create(req: Request, res: Response){
        try {
            const {
                mensagem,
                id_imovel,
                id_corretor
            } = req.body

            await knex('agendamento').insert({ 
                mensagem,
                id_imovel,
                id_corretor
            })
            res.status(201).send()

        } catch (error) {
           res.send(error)
        }
    }

    async update(req: Request, res: Response){
        try {
            const { situacao } = req.body
            const { id } = req.params

            await knex('agendamento')
            .update({ 
                situacao
            })
            .where({ id })

            return res.send()
        } catch (error) {
            res.send(error)
        }
    }

    async delete(req: Request, res: Response){
        try {
            const { id } = req.params
            const corretor = await knex('agendamento').where('id', id).first()
            
            if(!corretor) return res.status(400).json({ message:'agendamento não existe.'})
            
            await knex('agendamento')
                .where({ id })
                .del()
            return res.send()
        } catch (error) {
            res.send(error)
        }
    }

}

export default AgendamentoController