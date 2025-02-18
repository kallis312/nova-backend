# Build Stage
FROM node:20 as builder
WORKDIR /app
COPY package*.json ./   
COPY tsconfig.json ./         
RUN npm i
COPY . .
RUN npx prisma generate
RUN npm run build

# Run Stage
FROM node:20
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./

## TODO: install essential dependencies
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/public /app/public
COPY --from=builder /app/dist /app/dist

# ENTRYPOINT ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node ./dist/server.js"]
ENTRYPOINT ["sh", "-c", "npx prisma migrate deploy && node -r module-alias/register dist/server.js"]