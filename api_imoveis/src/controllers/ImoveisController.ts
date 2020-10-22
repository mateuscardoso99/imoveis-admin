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
        const imovel = await knex('imovel')
        .join('categoria', 'imovel.id_categoria','=','categoria.id')
        .join('corretor','imovel.id_corretor','=','corretor.id')
        .select('imovel.*', 'categoria.id as categoriaId', 'categoria.tipo', 'corretor.id as corretorId', 'corretor.nome')
        .where('imovel.id', String(id))

        const serializedImovel = imovel.map(imovel => {
            return{
                ...imovel,
                image: imovel.image.split(',')
            }
        })
        return res.json(serializedImovel)
    }

    async index(req: Request, res: Response){
        const imoveis = await knex('imovel')
        .join('categoria', 'imovel.id_categoria','=','categoria.id')
        .join('corretor','imovel.id_corretor','=','corretor.id')
        .select('imovel.*', 'categoria.id as categoriaId', 'categoria.tipo', 'corretor.id as corretorId', 'corretor.nome')
        const serializedImovel = imoveis.map(imovel => {
            return{
                ...imovel,
                image: imovel.image.split(',')
            }
        })
        return res.json(serializedImovel)
    }

    async create(req: any, res: Response){
        const files = req.files.map(function(file){
            return file.filename
        })
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

            await knex('imovel').insert({ 
                descricao,
                endereco,
                detalhes,
                image: JSON.stringify(files).replace(/[\[\]\\"]/g,''),
                latitude,
                longitude,
                cidade,
                uf,
                valor,
                id_categoria,
                id_corretor
            })
            res.status(201).send()

        } catch (error) {
           res.send(error)
        }
    }

    async update(req: any, res: Response){
        const {id} = req.params
        const files = req.files.map(function(file){
             return file.filename
        })

        let formatedImages = ''

        try {
            const {
                descricao,
                endereco,
                detalhes,
                images,
                latitude,
                longitude,
                cidade,
                uf,
                valor,
                id_categoria,
                id_corretor
            } = req.body
        
            if(images.length > 0){
                if(files.length > 0){
                    formatedImages = images.concat(files)
                }
                else{
                    formatedImages = images
                }
            }
            else{
                formatedImages = files
            }

            await knex('imovel').update({ 
                descricao,
                endereco,
                detalhes,
                image: JSON.stringify(formatedImages).replace(/[\[\]\\"]/g,''),
                latitude,
                longitude,
                cidade,
                uf,
                valor,
                id_categoria,
                id_corretor
             }).where({ id })

            console.log('files',files)
            console.log('images',images)
            console.log('formated',formatedImages)
            res.status(204).send()

        } catch (error) {
           res.send(error)
        }
    }

    async delete(req: Request, res: Response){
        try {
            const { id } = req.params

            await knex('imovel')
                .where({ id })
                .del()
            return res.status(204).send()

        } catch (error) {
            res.status(200).send(error)
        }
    }

}

export default ImoveisController