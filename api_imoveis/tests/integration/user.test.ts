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

describe('user', () => {
	it('usuario logado pode ver um usuario especifico', async () => {
		const resp = await request(app)
							.get('/users/1')
							.set('Authorization',`Bearer ${token}`)
		expect(resp.status).toBe(200)
		expect(resp.body).toEqual([{'id':1,'usuario':'admin'}])
	})

	it('usuario logado pode ver os usuarios cadastrados', async () => {
		const resp = await request(app)
							.get('/users')
							.set('Authorization',`Bearer ${token}`)
		expect(resp.status).toBe(200)
		expect(resp.body).toEqual([{'id':1,'usuario':'admin'}])
	})

	it('usuario logado pode criar um novo usuario', async () => {
		const data = {
			login: 'joao',
			password: '12345',
			password_confirmation: '12345'
		}
		const resp = await request(app)
							.post('/users')
							.set('Authorization',`Bearer ${token}`)
							.send(data)
		expect(resp.status).toBe(201)
	})

	it('usuario logado pode apagar um usuario', async () => {
		const resp = await request(app)
							.delete('/users/2')
							.set('Authorization',`Bearer ${token}`)
							.send()
		expect(resp.status).toBe(204)
	})

	it('usuario logado pode editar um usuario', async () => {
		const data = {
			login: 'paulo',
			password: '12345678',
			password_confirmation: '12345678'
		}
		const resp = await request(app)
							.put('/users/2')
							.set('Authorization',`Bearer ${token}`)
							.send(data)
		expect(resp.status).toBe(204)
	})


	it('usuario não pode criar um outro usuario se não estiver logado', async () => {
		const data = {
			login: 'admin',
			password: '1234',
			password_confirmation: '1234'
		}
		const response = await request(app).post('/users').send(data)
		expect(response.status).toBe(401)
	})
})
