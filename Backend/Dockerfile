FROM node:20-bullseye-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --omit=dev --ignore-scripts

COPY . .
RUN npx prisma generate

FROM node:20-bullseye-slim

WORKDIR /app

RUN apt-get update && apt-get install -y libssl1.1 && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app /app

EXPOSE 8000

CMD [ "node", "app.js" ]
