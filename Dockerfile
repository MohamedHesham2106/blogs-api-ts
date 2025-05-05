FROM node:current-alpine
WORKDIR /app

# Install Bun
RUN npm install -g bun

COPY package.json bun.lockb ./

# Use Bun for installation
RUN bun install

COPY src/prisma ./src/prisma/
RUN bunx prisma generate

COPY . .

EXPOSE 3000
CMD ["bun", "run", "dev"]
