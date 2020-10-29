import { Request, Response} from 'express'
import knex from '../database/connection'

class ImoveisController{

    /*async show(req: Request, res: Response){
        const {id} = req.params
        const imovel = await knex('imovel')
        .join('categoria', 'imovel.id_categoria','=','categoria.id')
        .join('corretor','imovel.id_corretor','=','corretor.id')
        .select('imovel.*', 'categoria.id as categoriaId', 'categoria.tipo', 'corretor.id as corretorId', 'corretor.nome')
        .where('imovel.id', String(id))

        const serializedImovel = imovel.map(imovel => {
            return{
                ...imovel,
                image_url: `http://localhost:3333/uploads/imoveis/${imovel.image}`
            }
        })
        return res.json(serializedImovel)
    }*/

    /*async index(req: Request, res: Response){
        const imovel = await knex('imovel')
        .join('categoria', 'imovel.id_categoria','=','categoria.id')
        .join('corretor','imovel.id_corretor','=','corretor.id')
        .select('imovel.*', 'categoria.id as categoriaId', 'categoria.tipo', 'corretor.id as corretorId', 'corretor.nome')
        const serializedImovel = imovel.map(imovel => {
            return{
                ...imovel,
                image_url: `http://localhost:3333/uploads/imoveis/${imovel.image}`
            }
        })
        return res.json(serializedImovel)
    }*/
    async show(req: Request, res: Response){
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
    }

    async index(req: Request, res: Response){
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
                .map(img => `http://localhost:3333/uploads/imoveis/${img}`)
            }
        })
        return res.json(serializedImoveis)
    }

    async create(req: Request, res: Response){
        const files = req.files as Express.Multer.File[]

        try {
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
           res.send(error)
        }
    }

    async update(req: Request, res: Response){
        const {id} = req.params
        const files = req.files as Express.Multer.File[]

        try {
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
           res.send(error)
        }
    }

    async delete(req: Request, res: Response){
        try {
            const { id } = req.params

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