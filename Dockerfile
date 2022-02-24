FROM node:14-alpine

COPY package.json /
RUN npm install --only=production

COPY ./dist /dist

WORKDIR /

EXPOSE 5005

CMD ["node", "/dist/index.js"]
