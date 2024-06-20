FROM node:20-alpine3.16 AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

FROM node:20-alpine3.16 AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build


FROM node:20-alpine3.16 AS runner

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --prod

COPY --from=builder /app/dist ./dist

RUN mkdir -p ./chatboot

COPY --from=builder ./app/dist/ ./app
COPY ./.env ./app/.env

RUN adduser --disabled-password chatbootUser
RUN chown -R chatbootUser:chatbootUser ./chatboot
USER chatbootUser

# EXPOSE 3000

CMD [ "node","dist/main"]
