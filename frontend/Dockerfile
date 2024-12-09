# Dockerfile

FROM node

WORKDIR /usr/src/app/frontend

COPY . .

RUN npm install

RUN npm run build


EXPOSE 3000

CMD cd ./frontend && npm start
