FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm config set registry http://registry.npmjs.org/
RUN sudo npm install

CMD ["npm", "start"]