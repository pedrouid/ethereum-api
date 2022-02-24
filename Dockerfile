FROM node:14-alpine

COPY package.json /
RUN npm install --only=production

COPY ./dist /

WORKDIR /dist 

EXPOSE 5005

CMD ["node", "index.js"]
