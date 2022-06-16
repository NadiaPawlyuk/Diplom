From node:lts-buster

WORKDIR /usr/src/shop_back
COPY package*.json ./
RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]