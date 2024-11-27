FROM node:20

WORKDIR /app

copy package.json package-lock.json ./

RUN npm install

COPY backend/ ./backend

WORKDIR /app/backend

EXPOSE 3000

CMD ["npm","start"]