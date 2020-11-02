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

describe('imoveis', () => {
	it('usuario logado pode criar um novo imovel', async () => {
		const data = {
            descricao: 'casa mobilhada 3 quartos',
            endereco: 'rua benjamin constant',
            detalhes: '2 banheiros, sala, cozinha, garagem para 2 carros',
            latitude: '-29.6988102',
            longitude: '-53.8343463',
            cidade: 'Santa Maria',
            uf: 'RS',
            valor: 120.000,
            id_categoria: 1,
            id_corretor: 2
		}
		const resp = await request(app)
							.post('/imoveis')
							.set('Authorization',`Bearer ${token}`)
							.send(data)
		expect(resp.status).toBe(201)
	})

	it('usuario logado pode ver um imovel especifico', async () => {
		const resp = await request(app)
							.get('/imoveis/1')
							.set('Authorization',`Bearer ${token}`)
		expect(resp.status).toBe(200)
		expect(resp.body).toEqual([
			{
				'categoria': 'casa',
	          	'cidade': 'Santa Maria',
	         	'corretor': 'felix',
	          	'descricao': 'casa mobilhada 3 quartos',
	          	'detalhes': '2 banheiros, sala, cozinha, garagem para 2 carros',
	          	'endereco': 'rua benjamin constant',
	         	'id': 1,
	          	'id_categoria': 1,
	          	'id_corretor': 2,
	         	'latitude': -29.6988102,
	         	'longitude': -53.8343463,
	          	'uf': 'RS',
	          	'valor': 120,
			}
		])
	})

	it('usuario logado pode ver os imoveis cadastrados', async () => {
		const resp = await request(app)
							.get('/imoveis')
							.set('Authorization',`Bearer ${token}`)
		expect(resp.status).toBe(200)
		expect(resp.body).toEqual([
			{
				'categoria': 'casa',
	          	'cidade': 'Santa Maria',
	         	'corretor': 'felix',
	          	'descricao': 'casa mobilhada 3 quartos',
	          	'detalhes': '2 banheiros, sala, cozinha, garagem para 2 carros',
	          	'endereco': 'rua benjamin constant',
	         	'id': 1,
	          	'id_categoria': 1,
	          	'id_corretor': 2,
	         	'latitude': -29.6988102,
	         	'longitude': -53.8343463,
	          	'uf': 'RS',
	          	'valor': 120,
			}
		])
	})

	it('usuario logado pode editar um imovel', async () => {
		const data = {
			descricao: 'apartamento 2 quartos',
            endereco: 'rua A',
            detalhes: '2 banheiros, sala, cozinha',
            latitude: '-29.6988102',
            longitude: '-53.8343463',
            cidade: 'Santa Maria',
            uf: 'RS',
            valor: 80.000,
            id_categoria: 2,
            id_corretor: 2
		}
		const resp = await request(app)
							.put('/imoveis/1')
							.set('Authorization',`Bearer ${token}`)
							.send(data)
		expect(resp.status).toBe(204)
	})


	it('usuario logado pode apagar um imovel', async () => {
		const resp = await request(app)
							.delete('/imoveis/1')
							.set('Authorization',`Bearer ${token}`)
							.send()
		expect(resp.status).toBe(204)
	})


	it('usuario não pode criar um outro imovel se não estiver logado', async () => {
		const data = {
			descricao: 'apartamento 2 quartos',
            endereco: 'rua A',
            detalhes: '2 banheiros, sala, cozinha',
            latitude: '-29.6988102',
            longitude: '-53.8343463',
            cidade: 'Santa Maria',
            uf: 'RS',
            valor: 80.000,
            id_categoria: 2,
            id_corretor: 2
		}
		const response = await request(app).post('/imoveis').send(data)
		expect(response.status).toBe(401)
	})
})
