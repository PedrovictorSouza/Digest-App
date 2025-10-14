FROM node:20-alpine

WORKDIR /app

COPY apps/backend/package*.json ./

RUN npm ci

COPY apps/backend ./

RUN npm run build

RUN npm prune --production

EXPOSE 8000

CMD ["node", "dist/server.js"]

