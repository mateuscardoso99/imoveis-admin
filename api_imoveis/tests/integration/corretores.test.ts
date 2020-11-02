/*
npm i jest
npm i supertest
npm i ts-jest
npm i babel-jest
npm i @babel/preset-env

criação e edição do arquivo babel.config.js

adição das flags preset e transform no arquivo
jest.config.js

adição do script 'pretest' que é executado antes do 
script 'test'

configurar banco de dados para desenvolvimento
e outro para teste

configuração do arquivo server para previnir
o conflito de portas
*/

import request from 'supertest'
import app from '../../src/server'

let token

beforeAll((done) => {
	request(app).post('/sign-in')
	.send({
		login: 'admin',
		password: '1234'
	})
	.end((err, response) => {
		token = response.body.metadata.token
		done()
	})
})

describe('corretor', () => {
	it('usuario logado pode criar um novo corretor', async () => {
		const data = {
			nome: 'silvio',
			email: 'silvio404@gmail.com'
		}
		const resp = await request(app)
							.post('/corretores')
							.set('Authorization',`Bearer ${token}`)
							.send(data)
		expect(resp.status).toBe(201)
	})

	it('usuario logado pode ver um corretor especifico', async () => {
		const resp = await request(app)
							.get('/corretores/2')
							.set('Authorization',`Bearer ${token}`)
		expect(resp.status).toBe(200)
		expect(resp.body).toEqual([
			{
				'email':'felix@gmail.com',
				'id':2,
				'imagem':null,
				'nome':'felix',
			}
		])
	})

	it('usuario logado pode ver os corretores cadastrados', async () => {
		const resp = await request(app)
							.get('/corretores')
							.set('Authorization',`Bearer ${token}`)
		expect(resp.status).toBe(200)
		expect(resp.body).toEqual([
			{
	    		"email": "joao@joao",
	        	"id": 1,
	    		"imagem": null,
	    	    "nome": "joao",
	    	},
	    	{
	    		"email": "felix@gmail.com",
	    		"id": 2,
	    		"imagem": null,
	    		"nome": "felix",
	        },
			{
	    	    "email": "silvio404@gmail.com",
	    	    "id": 3,
	        	"imagem": null,
	        	"nome": "silvio",
	        },
		])
	})

	it('usuario logado pode editar um corretor', async () => {
		const data = {
			nome: 'silvio silva',
			email: 'silviosilva404@gmail.com'
		}
		const resp = await request(app)
							.put('/corretores/1')
							.set('Authorization',`Bearer ${token}`)
							.send(data)
		expect(resp.status).toBe(204)
	})


	it('usuario logado pode apagar um corretor', async () => {
		const resp = await request(app)
							.delete('/corretores/1')
							.set('Authorization',`Bearer ${token}`)
							.send()
		expect(resp.status).toBe(204)
	})


	it('usuario não pode criar um outro corretor se não estiver logado', async () => {
		const data = {
			nome: 'marcos',
			email: 'marcos@gmail.com'
		}
		const response = await request(app).post('/corretores').send(data)
		expect(response.status).toBe(401)
	})
})
