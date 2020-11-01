import { Request, Response} from 'express'
import knex from '../database/connection'
import fs from 'fs'
import path from 'path'

class ImoveisController{
    async show(req: Request, res: Response){
        try{
            const {id} = req.params
            const imovel = await knex('imoveis')
            .leftJoin('categorias', 'imoveis.id_categoria','=','categorias.id')
            .leftJoin('corretores','imoveis.id_corretor','=','corretores.id')
            .leftJoin('imagens','imagens.id_imovel','=','imoveis.id')
            .select('imoveis.*', 'categorias.descricao as categoria', 'corretores.nome as corretor',
                knex.raw(`group_concat(imagens.path) as imagens`)).groupBy('imoveis.id')
            .where('imoveis.id', String(id))

            const serializedImovel = imovel.map(imovel => {
                return{
                    ...imovel,
                    imagens: imovel.imagens?.split(',')
                    .map(img =>`http://localhost:3333/uploads/imoveis/${img}`)
                }
            })
            return res.json(serializedImovel)
        }catch(error){
            return res.status(500).send()
        }
    }

    async index(req: Request, res: Response){
        try{
            const imoveis = await knex('imoveis')
            .leftJoin('categorias', 'imoveis.id_categoria','=','categorias.id')
            .leftJoin('corretores','imoveis.id_corretor','=','corretores.id')
            .leftJoin('imagens','imagens.id_imovel','=','imoveis.id')
            .select('imoveis.*', 'categorias.descricao as categoria', 'corretores.nome as corretor',
                knex.raw(`group_concat(imagens.path) as imagens`)).groupBy('imoveis.id')
            const serializedImoveis = imoveis.map(imovel => {
                return{
                    ...imovel,
                    imagens: imovel.imagens?.split(',')
                    .map(img => `http://10.0.0.5:3333/uploads/imoveis/${img}`)
                }
            })
            return res.json(serializedImoveis)
        }catch(error){
            return res.status(500).send()
        }
    }

    async create(req: Request, res: Response){
        try {
            const files = req.files as Express.Multer.File[]
            const {
                descricao,
                endereco,
                detalhes,
                latitude,
                longitude,
                cidade,
                uf,
                valor,
                id_categoria,
                id_corretor
            } = req.body

            const trs = await knex.transaction()

            const idImovel =  await trs('imoveis').insert({ 
                descricao,
                endereco,
                detalhes,
                latitude,
                longitude,
                cidade,
                uf,
                valor,
                id_categoria: id_categoria === '0' ? null : id_categoria,
                id_corretor: id_corretor === '0' ? null : id_corretor
            })

            const images = files.map(img => {
                return{
                    path: img.filename,
                    id_imovel: idImovel[0],
                    id_corretor: null
                }
            })
            await trs('imagens').insert(images)

            await trs.commit()

            res.status(201).send()

        } catch (error) {
            res.status(500).send(error)
        }
    }

    async update(req: Request, res: Response){
        try {
            const {id} = req.params
            const files = req.files as Express.Multer.File[]
            const {
                descricao,
                endereco,
                detalhes,
                latitude,
                longitude,
                cidade,
                uf,
                valor,
                id_categoria,
                id_corretor
            } = req.body

            const trs = await knex.transaction()

            await trs('imoveis').update({ 
                descricao,
                endereco,
                detalhes,
                latitude,
                longitude,
                cidade,
                uf,
                valor,
                id_categoria: id_categoria === '0' ? null : id_categoria,
                id_corretor: id_corretor === '0' ? null : id_corretor
            }).where({ id })

            if(files){
                const images = files.map(img => {
                    return{
                        path: img.filename,
                        id_imovel: id,
                        id_corretor: null
                    }
                })
                await trs('imagens').insert(images)
            }

            await trs.commit()

            res.status(204).send()

        } catch (error) {
            res.status(500).send(error)
        }
    }

    async delete(req: Request, res: Response){
        try {
            const { id } = req.params
            const imovel = await knex('imoveis')
            .leftJoin('imagens','imagens.id_imovel','=','imoveis.id')
            .select('imoveis.*',
                knex.raw(`group_concat(imagens.path) as imagens`)).groupBy('imoveis.id')
            .where('imoveis.id', id)

            if(!imovel){
                return res.status(400).json({ message:'imóvel não existe.'})
            }

            if(imovel[0].imagens){
                imovel[0].imagens.split(',').forEach(img => 
                    fs.unlink(path.resolve(__dirname,'..','..','uploads','imoveis', `${img}`), (err) => {
                        if (err) {
                            console.error(err)
                            return res.status(200).send(err)
                        }
                    })
                )  
            }

            await knex('imoveis')
                .where({ id })
                .del()
            return res.status(204).send()

        } catch (error) {
            res.status(200).send(error)
        }
    }

}

export default ImoveisController