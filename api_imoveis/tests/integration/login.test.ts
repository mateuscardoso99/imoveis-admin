import request from 'supertest'
import app from '../../src/server'

describe('login', () => {
	it('usuario deve receber um token ao logar com as credenciais validas', async () => {
		const data = {
			login: 'admin',
			password: '1234'
		}
		const response = await request(app)
								.post('/sign-in')
								.send(data)

		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty("metadata")
	})

	it('usuario nao deve logar com credenciais invalidas', async () => {
		const data = {
			login: 'carlos',
			password: 'dfjsdfjio'
		}
		const response = await request(app)
								.post('/sign-in')
								.send(data)

		expect(response.status).toBe(404)
	})
})