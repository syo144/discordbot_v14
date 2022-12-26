FROM node:16-alpine3.15
WORKDIR /app

RUN apk add --no-cache tini

#COPY package.json yarn.lock ./
COPY package.json ./
RUN npm install

#COPY . .

#ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "index.js"]
