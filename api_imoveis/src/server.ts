/* libs instaladas:
- npm install express mysql knex
- npm install ts-node -D
- npm install typescript -D
- npm install @types/express -D
- npx tsc --init
- npm install ts-node-dev -D
- npm install jsonwebtoken
- npm install @types/jsonwebtoken -D
*/
import express from 'express'
import routes from './routes'
import cors from 'cors'
import path from 'path'

import {checkJwt} from './auth/VerifyRequest'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/uploads',express.static(path.resolve(__dirname,'..','uploads')))
app.use(checkJwt)
app.use(routes)

app.listen(3333, () => console.log('SERVIDOR RODANDO'))