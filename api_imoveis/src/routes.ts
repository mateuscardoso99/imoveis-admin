import express from 'express'

import multer from 'multer'
import multerConfig from './config/multer'

import CategoriaController from './controllers/CategoriaController'
import UsersController from './controllers/UsersController'
import CorretoresController from './controllers/CorretoresController'
import ImoveisController from './controllers/ImoveisController'
import AgendamentoController from './controllers/AgendamentoController'
import SignInController from './controllers/SignInController'

const routes = express.Router()
const upload = multer(multerConfig)

const cat = new CategoriaController()
const user = new UsersController()
const corretor = new CorretoresController()
const imovel = new ImoveisController()
const agendamento = new AgendamentoController()
const signin = new SignInController()

//categorias
routes.post('/categorias', cat.create)
routes.get('/categorias',cat.index)
routes.delete('/categorias/:id', cat.delete)
routes.put('/categorias/:id', cat.update)

//users
routes.post('/users', user.create)
routes.get('/users', user.index)
routes.get('/users/:id', user.show)
routes.delete('/users/:id', user.delete)
routes.put('/users/:id', user.update)

//corretores
routes.post('/corretores', upload.single('imageCorretor'), corretor.create)
routes.get('/corretores', corretor.index)
routes.get('/corretores/:id', corretor.show)
routes.delete('/corretores/:id', corretor.delete)
routes.put('/corretores/:id', corretor.update)

//imoveis
routes.post('/imoveis', upload.array('imageImovel',20), imovel.create)
routes.get('/imoveis', imovel.index)
routes.get('/imoveis/:id', imovel.show)
routes.delete('/imoveis/:id', imovel.delete)
routes.put('/imoveis/:id', upload.array('imageImovel',20), imovel.update)

//agendamentos
routes.post('/agendamentos', agendamento.create)
routes.get('/agendamentos', agendamento.index)
routes.get('/agendamentos/:id', agendamento.show)
routes.delete('/agendamentos/:id', agendamento.delete)
routes.put('/agendamentos/:id', agendamento.update)

//login
routes.post('/sign-in', signin.signIn)

export default routes