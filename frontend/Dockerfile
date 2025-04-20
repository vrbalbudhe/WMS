FROM node:20-bullseye-slim

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ libssl1.1 && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
