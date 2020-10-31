import { Request, Response} from 'express'
import knex from '../database/connection'

class AgendamentoController{

    async show(req: Request, res: Response){
        try {
            const id = req.params
            const agendamento = await knex('agendamentos').where(id)
            return res.json(agendamento)
        }catch (error) {
            res.status(500).send(error)
        }
    }

    async index(req: Request, res: Response){
        try {
            const agendamentos = await knex('agendamentos')
            .join('corretores', 'corretores.id', '=', 'agendamentos.id_corretor')
            .join('imoveis', 'imoveis.id', '=', 'agendamentos.id_imovel')
            .select('agendamentos.*','corretor.nome as nomeCorretor')
            return res.json(agendamentos)
        }catch (error) {
            res.status(500).send(error)
        }
    }

    async create(req: Request, res: Response){
        try {
            const {
                mensagem,
                id_imovel,
                id_corretor
            } = req.body

            await knex('agendamentos').insert({ 
                mensagem,
                id_imovel,
                id_corretor
            })
            res.status(201).send()

        } catch (error) {
            res.status(500).send(error)
        }
    }

    async update(req: Request, res: Response){
        try {
            const { situacao } = req.body
            const { id } = req.params

            await knex('agendamentos')
            .update({ 
                situacao
            })
            .where({ id })

            return res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async delete(req: Request, res: Response){
        try {
            const { id } = req.params
            const corretor = await knex('agendamentos').where('id', id).first()
            
            if(!corretor) return res.status(400).json({ message:'agendamento não existe.'})
            
            await knex('agendamentos')
                .where({ id })
                .del()
            return res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    }

}

export default AgendamentoController