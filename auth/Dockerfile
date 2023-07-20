FROM node:alpine

WORKDIR /app
COPY package.json .
COPY . .
RUN npm install
RUN npx prisma generate

CMD ["npm", "run", "start:dev"]
