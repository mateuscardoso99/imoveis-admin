FROM node:alpine

WORKDIR /backend

COPY package*.json ./

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]